import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Link } from 'src/models/link.model';
import { ReturnModelType } from '@typegoose/typegoose';
import * as randomstring from 'randomstring';
import * as geoip from 'geoip-lite';
import { Visit } from '../../models/visit.model';
import { skip } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { log } from 'util';
@Injectable()
export class LinkService {
  constructor(
    @InjectModel(Link) private readonly linkModel: ReturnModelType<typeof Link>,
    @InjectModel(Visit) private readonly visitModel:ReturnModelType<typeof Visit>
  ) {}

  // ساخت استرینگ یونیک
  async createRandomString(){
    const shortLink = randomstring.generate({
      length:4,
      charset:'alphanumeric'
    });
    while(await this.linkModel.exists({shortLink})){
         await this.createRandomString();
    }
    return shortLink;
  }

  // ساخت لینک کوتاه
  async create(link:Link): Promise<{ link:Link }> {
    try {
      // لینک کوتاه
      const shortLink = await this.createRandomString();

      // لینک کوتاه جدید
      link.shortLink = shortLink;

      // ثبت لینک در پایگاه داده
        const newLink = new this.linkModel(link);
        await newLink.save();
        return { link:newLink };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  //   گرفتن لیست لینک ها که فقط توسط ادمین امکان پذیر است
  async getLinkList(search:string,skip:number,limit:number,status:string):
    Promise<{ links: Link[]; count:number }>{
      try{
        const query = {status};
        if(!!search){
          Object.assign(query ,{mainLink:new RegExp(search,'ig')})
        }
        const links = await this.linkModel.find(query)
          .skip(Number(skip))
          .limit(Number(limit))
          .populate({path:'user',select:'phone'})
          .sort({"createdAt":-1});
        const count = await this.linkModel.countDocuments(query);
        return {links,count}
      }catch (error) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }
  }

  // گرفتن لینک با استفاده از لینک کوتاه
  async getLinkByShortLink(shortLink:string):Promise<{ link:Link }>{
     try {
       // پیدا کردن لینک بر اساس لینک کوتاه
       const link = await this.linkModel.findOne({ shortLink });

       if(!link.showAds){
         return {link}
       }
       // آیا لینک مشکلی ندارد؟
       if(link.status !== 'active'){
         throw {message:'لینک دارای تخلف است'};
       }
       //پیدا کردن کشور بر اساس ip
       //TODO:
       const country = geoip.lookup('86.57.40.38').country;

       // تعداد بازدیدهای لینک
       const visits = await this.visitModel.find({link:link._id});

       // بررسی وجود کشور در بازدید ها
       const visitedCountry = visits.find(el=>el.country === country)

       // اگر وجود نداشت جدید ایجاد شود
       if(visitedCountry === undefined ){
        const newVisit = new this.visitModel({country,count:1,link:link._id});
        await newVisit.save();
       }else{
         // اگر وجود داشت یک عدد به تعداد بازدیدهای آن اضافه کند
        await this.visitModel.findByIdAndUpdate(visitedCountry._id,
          {count:visitedCountry.count+1},
          {new:true})
       }
       return { link };
     }catch (error) {
       throw new HttpException(error, HttpStatus.BAD_REQUEST);
     }
  }

  // گرفتن لینک با آیدی
  async getLinkById(id:string):Promise<{ visits:Visit[] }>{
    try{
      const visits = await this.visitModel.find({link:id});
      return {visits}
    }catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }


  // گرفتن لینک های یک کاربر خاص
  async getUserLink(
    search:string,
    id:string,
    skip:number,
    limit:number,
    status:string
  ):Promise<{ links:Link[];count:number }>{
      try{
        const query = {status,user:id};
        if(!!search){
          Object.assign(query,{mainLink:new RegExp(search,'ig')});
        }
        const links = await this.linkModel.find(query)
          .skip(Number(skip)).limit(Number(limit)).sort({"createdAt":-1});
        const  count = await this.linkModel.countDocuments(query);
        return {links,count}
      }catch (error) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }
  }

  // بروز رسانی یک لینک
  async update(id:string,link:Link):Promise<{status:boolean}>{
      try {
        delete link.shortLink;
        await this.linkModel.findByIdAndUpdate(id,link,{new:true});
        return {status:true}
      }catch (error) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }
  }

  // حذف یک لینک
  async delete(id:string):Promise<{link:Link}>{
     try {
       const link = await this.linkModel.findByIdAndRemove(id);
       await this.visitModel.remove({link:link._id});
       return {link}
     }catch (error) {
       throw new HttpException(error, HttpStatus.BAD_REQUEST);
     }
  }
}
