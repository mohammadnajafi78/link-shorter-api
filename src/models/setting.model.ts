import {prop} from '@typegoose/typegoose'

export class WithdrawsMethod{
 readonly _id?:string;

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
  readonly _id?:string;

  @prop({required:true})
  // تعرفه کلیک داخلی
  iranCPC:number;

  @prop({required:true})
  // تعرقه کلیک خارجی
  foreignCPC:number

  @prop({required:true,type:WithdrawsMethod})
  withdrawsMethods:WithdrawsMethod[];
}
