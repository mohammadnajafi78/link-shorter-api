import { prop, ModelOptions } from '@typegoose/typegoose';
// انواع تبلیغات شامل پاپ آپ و بنری
const ADS_TYPE = ['popup', 'banner'];
@ModelOptions({ schemaOptions: { timestamps: true } })
export class Ads {
  @prop({ required: true })
  image: string;

  //آدرس تبلیغ
  @prop({ required: true })
  link: string;

  //نوع تبلیغ
  @prop({ enum: ADS_TYPE })
  type?: string;

  @prop()
  description?: string;

  // مکان قرارگیری تبلیغات بر اساس عدد
  @prop({ type: Number })
  place?: number;

  // تاریخ شروع نمایش تبلیغ
  @prop()
  startAt?: Date;

  // تاریخ اتمام نمایش تبلیغ
  @prop()
  expireAt?: Date;

  // نمایش یا عدم نمایش تبلیغ
  @prop()
  active?: Boolean;

  //داخلی یا خارجی بودن تبلیغ
  @prop()
  foreign?:boolean;
}
