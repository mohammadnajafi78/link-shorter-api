import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from 'src/models/user.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import * as randomstring from 'randomstring';
import * as jwt from 'jsonwebtoken';
import { TOKEN_SECRET_KEY } from 'config';
import { Link } from '../../models/link.model';
import { Setting } from '../../models/setting.model';
import { Visit } from '../../models/visit.model';
import { SmsService } from '../../services/sms-service/sms-service';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
    @InjectModel(Link) private readonly linkModel:ReturnModelType<typeof Link>,
    @InjectModel(Setting) private readonly settingModel:ReturnModelType<typeof Setting>,
    @InjectModel(Visit) private readonly visitModel:ReturnModelType<typeof Visit>,
    private readonly smsService:SmsService
    ) {}

    async updateUserSalary(user:User):Promise<{user:User}>{
      try {
        const setting = await this.settingModel.find();
        const links = await this.linkModel.find({user:user._id});
        for(const link of links){
          const visits = await this.visitModel.find({link:link._id,isPay:false})
          if(visits.length > 0){
            for(const visit of visits){
              if(visit.country === "IR"){
                user.salary = user.salary + setting[0].iranCPC;
                visit.isPay = true;
              }else{
                user.salary = user.salary + setting[0].foreignCPC;
                visit.isPay = true;
              }
              await visit.save();
            }
          }
        }
        const newUser = await this.userModel.findByIdAndUpdate(user._id,{
          salary:user.salary
        })
        return {user:newUser}
      }catch (error) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }
    }

  // ثبت نام کاربر
  async signin(phone: string): Promise<{ status: boolean }> {
    try {
      if (phone.startsWith("0")) {
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
      if (userExist) {
        await this.userModel.findOneAndUpdate(
          { phone },
          { keys },
          { new: true },
        );
      } else {
        const user = new this.userModel({ phone, keys });
        await user.save();
      }

      // اسال SMS
      // TODO: Send SMS
      this.smsService.send(phone,keys.activateKey);
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
        .select('-keys');

      const count = await this.userModel.countDocuments(query);

      return { users, count };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  // بروزرسانی پروفایل کاربر
  async updateProfile(id: string, data: User): Promise<{ status:boolean }> {
    try {
      // حذف برای امنیت بروزرسانی
      delete data.role;
      delete data.status;
      delete data.keys;
      delete data.salary;
      delete data.phone;
      await this.userModel.findByIdAndUpdate(id, data, { new: true });
      return {status:true}
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
}
