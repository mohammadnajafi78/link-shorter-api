import { prop, ModelOptions } from '@typegoose/typegoose';
import {BaseSchema} from 'src/core/baseSchema'
import { ApiProperty } from '@nestjs/swagger';
// انواع تبلیغات شامل پاپ آپ و بنری
const ADS_TYPE = ['popup', 'banner'];
@ModelOptions({ schemaOptions: { timestamps: true } })
export class Ads {
  @ApiProperty({required:false})
  @prop()
  image?: string;

  //آدرس تبلیغ
  @ApiProperty({required:true})
  @prop({ required: true })
  link?: string;

  //نوع تبلیغ
  @ApiProperty({required:true,enum:ADS_TYPE})
  @prop({ enum: ADS_TYPE,required:true })
  type?: string;

  // مکان قرارگیری تبلیغات بر اساس عدد
  @ApiProperty({required:false})
  @prop({ type: Number,unique:true })
  place?: number;

  // نمایش یا عدم نمایش تبلیغ
  @ApiProperty({required:true})
  @prop({required:true,default:true})
  active?: boolean;

  //داخلی یا خارجی بودن تبلیغ
  @ApiProperty({required:true})
  @prop({required:true,default:true})
  iran?:boolean;
}
