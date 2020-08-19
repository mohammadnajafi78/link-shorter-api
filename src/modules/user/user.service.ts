import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from 'src/models/user.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import * as randomstring from 'randomstring';
import * as jwt from 'jsonwebtoken';
import { TOKEN_SECRET_KEY } from 'src/config';
import { Link } from '../../models/link.model';
import { Setting } from '../../models/setting.model';
import { Visit } from '../../models/visit.model';
import { SmsService } from '../../services/sms-service/sms-service';
import { identity } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
    @InjectModel(Link) private readonly linkModel: ReturnModelType<typeof Link>,
    @InjectModel(Setting) private readonly settingModel: ReturnModelType<typeof Setting>,
    @InjectModel(Visit) private readonly visitModel: ReturnModelType<typeof Visit>,
    private readonly smsService: SmsService,
  ) {
  }

  async createUniqueString() {
    const identifierCode = randomstring.generate({
      length: 5,
      charset: 'alphanumeric',
    });
    while (await this.userModel.exists({ identifierCode })) {
      await this.createUniqueString();
    }
    return identifierCode;
  }

  // محاسبه درامد کاربر در صورت گذشتن دو ساعت
  async updateUserSalary(user: User): Promise<{ user: User }> {
    try {
      // گرفتن تنظیمت برای چک کردن تعرفه کلیک ها
      const setting = await this.settingModel.find();
      // گرفتن لینک های کاربر
      const links = await this.linkModel.find({ user: user._id });

      // جمع کل درامد
      let totalSalary = 0;

      for (const link of links) {
        // گرفتن بازدید های هر لینک
        const visits = await this.visitModel.find({ link: link._id });
        // اگر بازدید وجود داشت
        if (visits.length > 0) {
          for (const visit of visits) {
            // اگر بازدید لینک بین 0 تا 3 باشد
            if (visit.count > 0 && visit.count !== visit.isPay && visit.isPay <= 3) {
              // بازدید اول بدون دریافت مبلغ
              if (visit.isPay === 0 && visit.count === 1) {
                if (visit.country === 'IR') {
                  user.salary = user.salary + setting[0].iranCPC.first;
                  totalSalary += setting[0].iranCPC.first;
                } else {
                  user.salary = user.salary + setting[0].foreignCPC.first;
                  totalSalary += setting[0].foreignCPC.first;
                }
                // بازدید دوم بدون دریافت مبلغ
              } else if (visit.isPay === 0 && visit.count === 2) {
                if (visit.country === 'IR') {
                  user.salary = user.salary + setting[0].iranCPC.first + setting[0].iranCPC.second;
                  totalSalary += setting[0].iranCPC.first + setting[0].iranCPC.second;
                } else {
                  user.salary = user.salary + setting[0].foreignCPC.first + setting[0].foreignCPC.second;
                  totalSalary += setting[0].foreignCPC.first + setting[0].foreignCPC.second;
                }
                // بازدید سوم دریافت مبلغ
              } else if (visit.isPay === 0 && visit.count === 3) {
                if (visit.country === 'IR') {
                  user.salary = user.salary + setting[0].iranCPC.first + setting[0].iranCPC.second + setting[0].iranCPC.third;
                  totalSalary += setting[0].iranCPC.first + setting[0].iranCPC.second + setting[0].iranCPC.third;
                } else {
                  user.salary = user.salary + setting[0].foreignCPC.first + setting[0].foreignCPC.second + setting[0].foreignCPC.third;
                  totalSalary += setting[0].foreignCPC.first + setting[0].foreignCPC.second + setting[0].foreignCPC.third;
                }
                // بازدید دوم با محاسبه بازدید اول
              } else if (visit.isPay === 1 && visit.count === 2) {
                if (visit.country === 'IR') {
                  user.salary = user.salary + setting[0].iranCPC.second;
                  totalSalary += setting[0].iranCPC.second;
                } else {
                  user.salary = user.salary + setting[0].foreignCPC.second;
                  totalSalary += setting[0].foreignCPC.second;
                }
                // بازدید سوم با محاسبه بازدید اول
              } else if (visit.isPay === 1 && visit.count === 3) {
                if (visit.country === 'IR') {
                  user.salary = user.salary + setting[0].iranCPC.second + setting[0].iranCPC.third;
                  totalSalary += setting[0].iranCPC.second + setting[0].iranCPC.third;
                } else {
                  user.salary = user.salary + setting[0].foreignCPC.second + setting[0].foreignCPC.third;
                  totalSalary += setting[0].foreignCPC.second + setting[0].foreignCPC.third;
                }
                // بازدید سوم با محسابه بازدید اول
              } else if (visit.isPay === 2 && visit.count === 3) {
                if (visit.country === 'IR') {
                  user.salary = user.salary + setting[0].iranCPC.third;
                  totalSalary += setting[0].iranCPC.third;
                } else {
                  user.salary = user.salary + setting[0].foreignCPC.third;
                  totalSalary += setting[0].foreignCPC.third;
                }
              }
              visit.isPay = visit.count;
              await visit.save();
            }
          }
        }
      }

      if (!!user.parent) {
        const parentUser = await this.userModel.findById(user.parent);
        parentUser.subsetSalary = parentUser.subsetSalary + (totalSalary / 100) * 5;
        parentUser.salary = parentUser.salary + (totalSalary / 100) * 5;
        await parentUser.save();
      }

      // بروزرسانی درامد
      const newUser = await this.userModel.findByIdAndUpdate(user._id, {
        salary: user.salary,
      }, { new: true });
      return { user: newUser };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  // پیدا کردن زیر مجموعه های یک کاربر
  async findSubset(id: string): Promise<{ users: User[] }> {
    try {
      const users = await this.userModel.find({ parent: id }).select('phone createdAt');
      return { users };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  // ثبت نام کاربر
  async signin(phone: string, identifier?: string): Promise<{ status: boolean }> {
    try {
      // حذف صفر ابتدای شماره
      if (phone.startsWith('0')) {
        phone = phone.substr(1);
      }
      const userExist = await this.userModel.exists({ phone });
      const keys = {
        activateKey: randomstring.generate({
          charset: 'numeric',
          length: 6,
        }),
        activateExpire: new Date(Date.now() + 60 * 60 * 1000),
      };

      // اگر کاربر وجود دارد فقط کلید جدید تولید شود
      if (userExist) {
        await this.userModel.findOneAndUpdate(
          { phone },
          { keys },
          { new: true },
        );
      } else {
        // ایجاد کد معرف برای کاربر
        const identifierCode = await this.createUniqueString();
        // افزودن اطلاعات مورد نیاز به آبجکت
        const newUser: User = { phone, keys, identifierCode };
        // آیا کد معرف وجود دارد؟
        let identifierExist: boolean;
        if (!!identifier) {
          identifierExist = await this.userModel.exists({ identifierCode: identifier });
        }
        // اگر کد معرف وجود دارد در مدل کاربر ثبت شود
        if (identifierExist) {
          const identifierUser = await this.userModel.findOne({ identifierCode: identifier });
          Object.assign(newUser, { parent: identifierUser._id });
        }
        const user = new this.userModel(newUser);
        await user.save();
      }

      // اسال SMS
      this.smsService.send(phone, keys.activateKey);

      return { status: true };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  // اعتبار سنجی کاربر
  async verify(phone: string, key: string) {
    try {
      const user = await this.userModel.findOne({
        phone,
        'keys.activateKey': key,
      });

      // آیا کاربر با این شماره تلفن و کلید وجود دارد؟
      if (user) {
        // آیا کلید منقضی شده است یا خیر؟
        if (user.keys.activateExpire <= new Date()) {
          throw { message: 'درخواست شما منقضی شده است.' };
        }
        if (user.status === 'block') {
          throw  { message: 'شما بلاک شده اید برای اطلاعات بیشتر به پشتیبانی پیام دهید' };
        }
        user.keys.activateKey = '';
        user.keys.activateExpire = new Date(Date.now());
        user.status = 'active';
        await user.save();
        const payload = { _id: user._id };
        const token = jwt.sign(payload, TOKEN_SECRET_KEY);

        return { message: 'شما وارد شدید', token };
      } else {
        throw { message: 'کد فعالسازی اشتباه است' };
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  // گرفتن لیست کاربران
  async getUserList(
    search: string,
    skip: number,
    limit: number,
  ): Promise<{ users: User[]; count: number }> {
    try {
      const query = {};
      if (!!search) {
        Object.assign(query, { name: new RegExp(search, 'g') });
      }
      const users = await this.userModel
        .find(query)
        .skip(Number(skip))
        .limit(Number(limit))
        .select('-keys')
        .sort({ 'createdAt': -1 });

      const count = await this.userModel.countDocuments(query);

      return { users, count };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  // بروزرسانی پروفایل کاربر
  async updateProfile(id: string, data: User): Promise<{ status: boolean }> {
    try {
      // حذف برای امنیت بروزرسانی
      delete data.role;
      delete data.status;
      delete data.keys;
      delete data.salary;
      delete data.phone;
      await this.userModel.findByIdAndUpdate(id, data, { new: true });
      return { status: true };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  // بلاک کردن وضعیت یک کاربر
  async blockUser(id: string): Promise<{ status: boolean }> {
    try {
      await this.userModel.findByIdAndUpdate(
        id,
        { status: 'block' },
        { new: true },
      );
      return { status: true };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  // گرفتن کاربر با شماره تلفن برای ربات تلگرام
  async getUserByPhone(phone: string): Promise<{ user: User }> {
    try {
      const user = await this.userModel.findOne({ phone }).select('phone');
      return { user };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

}


