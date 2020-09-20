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
import * as md5 from 'md5';
import * as nodemailer from 'nodemailer';
import e = require('express');
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
    @InjectModel(Link) private readonly linkModel: ReturnModelType<typeof Link>,
    @InjectModel(Setting)
    private readonly settingModel: ReturnModelType<typeof Setting>,
    @InjectModel(Visit)
    private readonly visitModel: ReturnModelType<typeof Visit>,
  ) {}

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
            if (
              visit.count > 0 &&
              visit.count !== visit.isPay &&
              visit.isPay <= 3
            ) {
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
                  user.salary =
                    user.salary +
                    setting[0].iranCPC.first +
                    setting[0].iranCPC.second;
                  totalSalary +=
                    setting[0].iranCPC.first + setting[0].iranCPC.second;
                } else {
                  user.salary =
                    user.salary +
                    setting[0].foreignCPC.first +
                    setting[0].foreignCPC.second;
                  totalSalary +=
                    setting[0].foreignCPC.first + setting[0].foreignCPC.second;
                }
                // بازدید سوم دریافت مبلغ
              } else if (visit.isPay === 0 && visit.count === 3) {
                if (visit.country === 'IR') {
                  user.salary =
                    user.salary +
                    setting[0].iranCPC.first +
                    setting[0].iranCPC.second +
                    setting[0].iranCPC.third;
                  totalSalary +=
                    setting[0].iranCPC.first +
                    setting[0].iranCPC.second +
                    setting[0].iranCPC.third;
                } else {
                  user.salary =
                    user.salary +
                    setting[0].foreignCPC.first +
                    setting[0].foreignCPC.second +
                    setting[0].foreignCPC.third;
                  totalSalary +=
                    setting[0].foreignCPC.first +
                    setting[0].foreignCPC.second +
                    setting[0].foreignCPC.third;
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
                  user.salary =
                    user.salary +
                    setting[0].iranCPC.second +
                    setting[0].iranCPC.third;
                  totalSalary +=
                    setting[0].iranCPC.second + setting[0].iranCPC.third;
                } else {
                  user.salary =
                    user.salary +
                    setting[0].foreignCPC.second +
                    setting[0].foreignCPC.third;
                  totalSalary +=
                    setting[0].foreignCPC.second + setting[0].foreignCPC.third;
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
        parentUser.subsetSalary =
          parentUser.subsetSalary + Math.ceil((totalSalary / 100) * 5);
        parentUser.salary =
          parentUser.salary + Math.ceil((totalSalary / 100) * 5);
        await parentUser.save();
      }

      // بروزرسانی درامد
      const newUser = await this.userModel
        .findByIdAndUpdate(
          user._id,
          {
            salary: user.salary,
          },
          { new: true },
        )
        .select('-password');
      return { user: newUser };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async changePassword(password: string, code: string) {
    try {
      const user = await this.userModel.findOne({
        'keys.resetPasswordKey': code,
      });

      if (user) {
        user.keys.resetPasswordKey = '';
        user.keys.expierTime = new Date(Date.now());
        user.password = md5(password);
        await user.save();
        return { status: true };
      } else {
        throw { message: 'کاربر وجود ندارد' };
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  // پیدا کردن زیر مجموعه های یک کاربر
  async findSubset(id: string): Promise<{ users: User[] }> {
    try {
      const users = await this.userModel
        .find({ parent: id })
        .select('username createdAt');
      return { users };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async resetPassword(email: string) {
    try {
      const user = await this.userModel.findOne({ email });

      if (!user) {
        throw { message: 'ایمیل وجود ندارد' };
      }
      const resetKey = randomstring.generate({
        length: 30,
        charset: 'alphanumeric',
      });

      const transporter = nodemailer.createTransport({
        host: 'mail.igad.ir',
        port: 587,
        tls: {
          rejectUnauthorized: false,
        },
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'no.reply@igad.ir', // generated ethereal user
          pass: 'QNfPdRoRQM', // generated ethereal password
        },
      });

      const info = await transporter.sendMail({
        from: '1xad.net <no.reply@igad.ir>', // sender address
        to: email, // list of receivers
        subject: 'فراموشی رمز عبور', // Subject line
        html: `<div style="text-align: right;font-size: 16px;font-weight: 600;">
                برای بازیابی رمز عبور روی این <a href='https://1xad.net/email/verify/${user.keys.resetPasswordKey}'> لینک </a> کلیک کنید
              </div>`, // html body
      });

      user.keys.resetPasswordKey = resetKey;
      user.keys.expierTime = new Date(Date.now() + 60 * 60 * 1000);
      await user.save();
      return { status: true };
    } catch (error) {
      console.log(error);

      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async verifyRessetPassword(code: string) {
    try {
      const user = await this.userModel.findOne({
        'keys.resetPasswordKey': code,
      });

      if (user) {
        if (user.keys.expierTime <= new Date()) {
          throw { message: 'درخواست شما منقضی شده است' };
        }
        return { status: true };
      } else {
        throw { message: 'کد اشتباه است' };
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async signUp(
    username: string,
    email: string,
    password: string,
    identifier?: string,
  ) {
    try {
      const userExist = await this.userModel.exists({ email });
      if (!!userExist) {
        throw { message: 'ایمیل قبلا ثبت شده است' };
      }
      const identifierCode = await this.createUniqueString();

      const newUser: User = {
        username,
        email,
        password: md5(password),
        identifierCode,
        status: 'active',
      };

      if (!!identifier) {
        const parent = await this.userModel.findOne({
          identifierCode: identifier,
        });
        Object.assign(newUser, { parent: parent._id });
      }

      const user = new this.userModel(newUser);

      await user.save();
      const payload = { _id: user._id };
      const token = jwt.sign(payload, TOKEN_SECRET_KEY);

      return { token, status: true };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async usernameExist(username: string): Promise<boolean> {
    try {
      return await this.userModel.exists({ username });
    } catch (error) {
      throw { message: 'نام کاربری یا رمز عبور اشتباه' };
    }
  }

  async login(username: string, password: string) {
    try {
      const user = await this.userModel.findOne({
        username,
        password: md5(password),
      });
      if (!!user) {
        const payload = { _id: user._id };
        const token = jwt.sign(payload, TOKEN_SECRET_KEY);
        return { token, status: true };
      } else {
        throw { message: 'نام کاربری یا رمز عبور اشتباه' };
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
        Object.assign(query, { username: new RegExp(search, 'g') });
      }
      const users = await this.userModel
        .find(query)
        .skip(Number(skip))
        .limit(Number(limit))
        .select('-password')
        .sort({ createdAt: -1 });

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
      delete data.salary;
      delete data.password;
      await this.userModel.findByIdAndUpdate(id, data, { new: true });
      return { status: true };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  // تغییرات پروفایل کاربری ادمین
  async adminUpdate(id: string, data: User): Promise<{ user: User }> {
    try {
      const user = await this.userModel.findByIdAndUpdate(id, data, {
        new: true,
      });
      return { user };
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
