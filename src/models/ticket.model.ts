import { prop, ModelOptions } from '@typegoose/typegoose';
import validator from 'validator';
import { BaseSchema } from 'src/core/baseSchema';
import { ApiProperty } from '@nestjs/swagger';

@ModelOptions({ schemaOptions: { timestamps: true } })
export class Ticket {
  @ApiProperty({ required: true })
  @prop({ required: true })
  phone?: string;

  @ApiProperty({ required: true })
  @prop({ required: true })
  name?: string;

  @ApiProperty({ required: true })
  @prop({ required: true })
  family?: string;

  @ApiProperty({ required: true })
  @prop({ required: true })
    //متن تیکت پشتیبانی
  content?: string;

  @ApiProperty({ required: true })
  @prop({ required: true })
    // موضوع تیکت
  subject?: string;

  @ApiProperty({ required: true })
  @prop({ required: true, validate: validator.isEmail })
  email?: string;

  @ApiProperty({ default: false })
  @prop({ default: false })
    // خوانده شده یا نشده
  read?: boolean;

}
