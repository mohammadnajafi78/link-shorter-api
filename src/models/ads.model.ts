import { prop, ModelOptions } from '@typegoose/typegoose';

// انواع تبلیغات شامل پاپ آپ و بنری
const ADS_TYPE = ['popup', 'banner'];
@ModelOptions({ schemaOptions: { timestamps: true } })
export class Ads {
  @prop()
  image?: string;

  //آدرس تبلیغ
  @prop({ required: true })
  link?: string;

  //نوع تبلیغ
  @prop({ enum: ADS_TYPE,required:true })
  type?: string;

  // مکان قرارگیری تبلیغات بر اساس عدد
  @prop({ type: Number,unique:true })
  place?: number;

  // نمایش یا عدم نمایش تبلیغ
  @prop({required:true,default:true})
  active?: boolean;

  //داخلی یا خارجی بودن تبلیغ
  @prop({required:true,default:true})
  iran?:boolean;
}
