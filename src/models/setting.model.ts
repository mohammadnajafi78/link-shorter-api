import {prop} from '@typegoose/typegoose'

class WithdrawsMethod{
  @prop({required:true})
  title:string;

  @prop({required:true})
  description:string;

  @prop({required:true})
  min:number;

  @prop({required:true})
  active:boolean;
}

export class Setting{
  @prop({required:true})
  // تعرفه کلیک داخلی
  iranCPC:number;

  @prop({required:true})
  // تعرقه کلیک خارجی
  foreignCPC:number

  @prop({required:true,type:WithdrawsMethod})
  withdrawsMethods:WithdrawsMethod[];
}
