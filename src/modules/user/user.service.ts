import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { User } from 'src/models/user.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import * as randomstring from 'randomstring';
import * as jwt from 'jsonwebtoken';
import { TOKEN_SECRET_KEY } from 'config';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
  ) {}
  async signin(phone: string): Promise<{ status: boolean; key: string }> {
    try {
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

      // TODO: Send SMS

      return { status: true, key: keys.activateKey };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async verify(phone: string, key: string) {
    try {
      const user = await this.userModel.findOne({
        phone,
        'keys.activateKey': key,
      });

      if (user) {
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
}
