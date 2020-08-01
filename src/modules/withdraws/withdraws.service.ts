import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Withdraws } from '../../models/whithdraws.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from '../../models/user.model';

@Injectable()
export class WithdrawsService {
  constructor(
    @InjectModel(Withdraws) private readonly withdrawsModel:ReturnModelType<typeof Withdraws>,
    @InjectModel(User) private readonly userModel:ReturnModelType<typeof User>
  ) {}

  // برداشت مبلغ جدید
  async create(id:string,amount:number):Promise<{ withdraws:Withdraws }>{
    try{
      const user = await this.userModel.findById(id);
      if(typeof amount === 'undefined'){
        amount = user.salary;
      }
      if(amount > user.salary){
        throw {message: 'مبلغ برداشت بیشتر از درامد شماست'}
      }

      // برداشت مبلغ از دارمد کاربر
      user.salary = user.salary - amount;
      await  user.save();

      if(!user.name && !user.family && !user.address && !user.accountAddress && !user.withdrawsType){
        throw {message: 'ابتدا فرم را تکمیل کنید'}
      }
      const withdraws = new this.withdrawsModel({amount,user:id});
      await withdraws.save();
      return { withdraws };
    }catch (error) {
      throw new HttpException(error,HttpStatus.BAD_REQUEST);
    }
  }

  // گرفتن لیست برداشت ها
  async getWithdrawsList(
    search:string,
    skip:number,
    limit:number,
    status:string
  ):Promise<{withdraws:Withdraws[]; count: number}>{
    try{
      const query = {status};
      if(!!search){
        Object.assign(query,{accountAddress:new RegExp(search,'ig')});
      }

      const withdraws = await this.withdrawsModel.find(query)
        .skip(Number(skip))
        .limit(Number(limit))
        .populate({path:'user',select:'-key'})
      const count = await this.withdrawsModel.countDocuments(query);
      return {withdraws,count}
    }catch (error) {
      throw new HttpException(error,HttpStatus.BAD_REQUEST);
    }
  }

  // گرفتن برداشت های یک کاربر
  async getUserWithdrawsList(skip:number,limit:number,id:string):Promise<{ withdraws:Withdraws[];count:number }>{
    try {
      const withdraws = await this.withdrawsModel.find({user:id})
        .skip(Number(skip)).limit(Number(limit))
        .populate({path:'user',select:'withdrawsType accountAddress'});
      const count = await  this.withdrawsModel.countDocuments({user:id});
      return {withdraws,count}
    }catch (error) {
      throw new HttpException(error,HttpStatus.BAD_REQUEST);
    }
  }

  // گرفتن اطلاعات یک برداشت
  async getWithdrawsById(id:string):Promise<{ withdraws:Withdraws }>{
    try {
      const withdraws = await this.withdrawsModel.findById(id).populate({path:'user',select:'-keys'});
      return  {withdraws}
    }catch (error) {
      throw new HttpException(error,HttpStatus.BAD_REQUEST);
    }
  }

  // موقیت آمیز کردن یک پرداخت
  async setWithdrawsSuccess(id:string,trackNumber:number):Promise<{ withdraws:Withdraws }>{
    try {
      if(!trackNumber){
        throw {message:'کد رهگیری الزامی است'}
      }
     const withdraws = await this.withdrawsModel.findByIdAndUpdate(id,{status:'success',trackNumber},{new:true});
      return {withdraws}
    }catch (error) {
      throw new HttpException(error,HttpStatus.BAD_REQUEST);
    }
  }

  // کنسل کردن یک برداشت
  async setWithdrawsCancel(id:string):Promise<{withdraws: Withdraws }>{
    try {
      const withdraws = await this.withdrawsModel.findByIdAndUpdate(id,{status:'cancel'},{new:true});
      const user = await this.userModel.findById(withdraws.user);
      user.salary = user.salary + withdraws.amount;
      await user.save();
      return { withdraws };
    }catch (error) {
      throw new HttpException(error,HttpStatus.BAD_REQUEST);
    }
  }

}
