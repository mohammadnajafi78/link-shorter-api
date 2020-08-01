import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Setting } from '../../models/setting.model';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class SettingService {
  constructor(
    @InjectModel(Setting) private readonly settingModel:ReturnModelType<typeof Setting>
  ) {}

  // ایجاد تنظیملت
  async create(setting:Setting):Promise<{ setting:Setting }>{
    try {
      const newSetting = new this.settingModel(setting);
      await newSetting.save();
      return {setting:newSetting}
    }catch (error) {
      throw new HttpException(error,HttpStatus.BAD_REQUEST);
    }
  }

  // گرفتن تنظیمات
  async get():Promise<{setting:Setting[]}>{
    try{
      const setting = await this.settingModel.find();
      return {setting}
    }catch (error) {
      throw new HttpException(error,HttpStatus.BAD_REQUEST);
    }
  }

  // ویرایش تنظیمات
  async update(id:string,data:Setting):Promise<{setting:Setting}>{
    try{
      const setting = await this.settingModel.findByIdAndUpdate(id, data,{new:true});
      return {setting}
    }catch (error) {
      throw new HttpException(error,HttpStatus.BAD_REQUEST);
    }
  }


}
