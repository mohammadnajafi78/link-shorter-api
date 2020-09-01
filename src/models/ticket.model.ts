import { BaseSchema } from './../core/baseSchema';
import { User } from './user.model';
import { prop, ModelOptions, Ref } from '@typegoose/typegoose';
import validator from 'validator';
import { ApiProperty } from '@nestjs/swagger';

export class Messages extends BaseSchema {
  @ApiProperty({ required: true, enum: ['user', 'admin'] })
  @prop({ required: true, enum: ['user', 'admin'] })
  from?: string;

  @ApiProperty({ required: true })
  @prop({ required: true })
  message?: string;
}

@ModelOptions({ schemaOptions: { timestamps: true } })
export class Ticket extends BaseSchema {
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

  @ApiProperty({ required: true, type: User })
  @prop({ required: true, ref: User })
  // کاربر
  user?: Ref<User>;

  @ApiProperty({ required: false, type: Messages })
  @prop({ type: Messages })
  messages?: Messages[];
}
