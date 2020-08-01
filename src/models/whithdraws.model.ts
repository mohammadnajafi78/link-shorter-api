import { prop , Ref , ModelOptions } from '@typegoose/typegoose';
import { User } from './user.model';

const WITHDRAWS_STATUS = ['success','waiting','cancel']
@ModelOptions({schemaOptions:{timestamps:true}})
export class Withdraws {

  //کاربری که میخواهد برداشت کند
  @prop({ref:User})
  user?:Ref<User>

  // وضعیت برداشت شامل موفق، در انتظار و لفو شده
  @prop({enum:WITHDRAWS_STATUS,default:'waiting'})
  status?:string;

  // مقدار برداشت
  @prop({required:true})
  amount?:number;

  @prop()
  trackNumber?:number;
}
