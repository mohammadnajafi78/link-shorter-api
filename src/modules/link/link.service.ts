import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Link } from 'src/models/link.model';
import { ReturnModelType } from '@typegoose/typegoose';
import * as randomstring from 'randomstring';
import * as geoip from 'geoip-lite';
import { Visit } from '../../models/visit.model';
import { Types } from 'mongoose';

@Injectable()
export class LinkService {
  constructor(
    @InjectModel(Link) private readonly linkModel: ReturnModelType<typeof Link>,
    @InjectModel(Visit) private readonly visitModel: ReturnModelType<typeof Visit>,
  ) {
  }

  // ساخت استرینگ یونیک
  async createRandomString() {
    const shortLink = randomstring.generate({
      length: 4,
      charset: 'alphanumeric',
    });
    while (await this.linkModel.exists({ shortLink })) {
      await this.createRandomString();
    }
    return shortLink;
  }

  // ساخت لینک کوتاه
  async create(link: Link): Promise<{ link: Link }> {
    try {
      // لینک کوتاه
      const shortLink = await this.createRandomString();

      // لینک کوتاه جدید
      link.shortLink = shortLink;

      if (!link.user) {
        link.showAds = false;
      }

      // ثبت لینک در پایگاه داده
      const newLink = new this.linkModel(link);
      await newLink.save();
      return { link: newLink };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  //   گرفتن لیست لینک ها که فقط توسط ادمین امکان پذیر است
  async getLinkList(search: string, skip: number, limit: number, status: string):
    Promise<{ links: Link[]; count: number }> {
    try {
      const query = { status };
      if (!!search) {
        Object.assign(query, { mainLink: new RegExp(search, 'ig') });
      }
      const links = await this.linkModel.find(query)
        .skip(Number(skip))
        .limit(Number(limit))
        .populate({ path: 'user', select: 'phone' })
        .sort({ 'createdAt': -1 });
      const count = await this.linkModel.countDocuments(query);
      return { links, count };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  // گرفتن لینک با استفاده از لینک کوتاه
  async getLinkByShortLink(shortLink: string): Promise<{ link: Link }> {
    try {
      // پیدا کردن لینک بر اساس لینک کوتاه
      const link = await this.linkModel.findOne({ shortLink });

      // آیا لینک مشکلی ندارد؟
      if (link.status !== 'active') {
        throw { message: 'لینک دارای تخلف است' };
      }

      return { link };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  // بازدید یک لینک
  async createVisit(id: string, ip: string): Promise<{ status: boolean }> {
    try {
      //پیدا کردن کشور بر اساس ip
      const country = geoip.lookup(ip).country;
      // آیا ip در بازدید ها وجود دارد؟
      const visit = await this.visitModel.findOne({ ip: '12345', link: id });
      if (visit) {
        if (visit.count >= 3) {
          return { status: true };
        }
        visit.count = visit.count + 1;
        await visit.save();
        return { status: true };
      }

      const newVisit = new this.visitModel({ ip, country, link: id });
      await newVisit.save();
      return { status: true };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  // گرفتن لینک با آیدی
  async getVisit(id: string): Promise<any> {
    try {
      const linkId = Types.ObjectId(id);
      // لیست بازدید ها برای جدول
      const visits = await this.visitModel.find({ link: id });
      // آمار روزانه برای نمودار
      const visitChart = await this.visitModel.aggregate([
        {
          '$match': {
            // لینک ها با آیدی داده شده
            'link': linkId,
          },
        }, {
          '$group': {
            '_id': {
              '$dateToString': {
                // از آیدی تاریخ روز را به این فرمت استخراج میکند
                'format': '%Y/%m/%d',
                'date': '$createdAt',
              },
            },
            'count': {
              // تعداد بازدید های دیده شده در این روز
              '$sum': 1,
            },
          },
        }, {
          '$project': {
            '_id': 0,
            // برای نمودار بازدید ها باید name و value داشته باشیم
            'name': '$_id',
            'value': '$count',
          },
        }, {
          '$sort': {
            'date': -1,
          },
        },
      ]).limit(30);
      return { visitChart, visits };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }


  // گرفتن لینک های یک کاربر خاص
  async getUserLink(
    search: string,
    id: string,
    skip: number,
    limit: number,
    status: string,
  ): Promise<{ links: Link[]; count: number }> {
    try {
      const query = { status, user: id };
      if (!!search) {
        Object.assign(query, { mainLink: new RegExp(search, 'ig') });
      }
      const links = await this.linkModel.find(query)
        .skip(Number(skip)).limit(Number(limit)).sort({ 'createdAt': -1 });
      const count = await this.linkModel.countDocuments(query);
      return { links, count };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  // بروز رسانی یک لینک
  async update(id: string, link: Link): Promise<{ status: boolean }> {
    try {
      // حذف برای امنیت
      delete link.shortLink;
      delete link.mainLink;
      await this.linkModel.findByIdAndUpdate(id, link, { new: true });
      return { status: true };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

}
