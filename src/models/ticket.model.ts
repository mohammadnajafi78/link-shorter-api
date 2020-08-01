import {prop , ModelOptions} from '@typegoose/typegoose';
import validator from 'validator'


@ModelOptions({schemaOptions:{timestamps:true}})
export class Ticket{
  @prop({required:true})
  phone?:string;

  @prop({required:true})
  name?:string;

  @prop({required:true})
  family?:string;

  @prop({required:true})
  //متن تیکت پشتیبانی
  content?:string

  @prop({required:true})
  // موضوع تیکت
  subject?:string;

  @prop({required:true,validate:validator.isEmail})
  email?:string;

  @prop({default:false})
  // خوانده شده یا نشده
  read?:boolean;

}
