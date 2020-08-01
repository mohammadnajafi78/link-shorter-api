import { prop, ModelOptions, Ref } from '@typegoose/typegoose';
import { User } from './user.model';
import validator from 'validator';
const LINK_STATUS = ['active','inactive','warning']

@ModelOptions({ schemaOptions: { timestamps: true } })
export class Link {
  @prop({ required: true ,validate:validator.isURL})
  mainLink?: string;

  @prop({ required: true, unique: true })
  shortLink?: string;

  @prop({required:true , default:'active' , enum:LINK_STATUS})
  status?:string;

  @prop({ ref: User })
  user?: Ref<User>;

  @prop({required:true})
  showAds?:boolean;
}
