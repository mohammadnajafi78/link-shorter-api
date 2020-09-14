import { prop, ModelOptions } from '@typegoose/typegoose';
import { BaseSchema } from 'src/core/baseSchema';
import { ApiProperty } from '@nestjs/swagger';
// انواع تبلیغات شامل پاپ آپ و بنری
const ADS_TYPE = ['popup', 'vertical', 'horizontal', 'movie', 'vast'];

@ModelOptions({ schemaOptions: { timestamps: true } })
export class Ads extends BaseSchema {
  @ApiProperty({ required: false })
  @prop()
  image?: string;

  //آدرس تبلیغ
  @ApiProperty({ required: true })
  @prop({ required: true, trim: true })
  link?: string;

  //نوع تبلیغ
  @ApiProperty({ required: true, enum: ADS_TYPE })
  @prop({ enum: ADS_TYPE, required: true })
  type?: string;

  // نمایش یا عدم نمایش تبلیغ
  @ApiProperty({ required: true })
  @prop({ required: true, default: true })
  active?: boolean;

  //داخلی یا خارجی بودن تبلیغ
  @ApiProperty({ required: true })
  @prop({ required: true, default: true })
  iran?: boolean;
}
