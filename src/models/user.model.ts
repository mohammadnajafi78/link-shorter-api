import { prop, ModelOptions, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { BaseSchema } from 'src/core/baseSchema';
//وضعیت های کاربران
const USER_STATUS = ['active', 'inactive', 'block'];

// نقش های کاربران
const USER_ROLE = ['admin', 'user'];

class Key {
  @ApiProperty()
  @prop()
  resetPasswordKey?: string;

  @ApiProperty()
  @prop()
  expierTime?: Date;
}

@ModelOptions({ schemaOptions: { timestamps: true } })
export class User extends BaseSchema {
  @ApiProperty({ required: true })
  @prop({ required: true, unique: true, trim: true })
  email?: string;

  @ApiProperty({ required: true })
  @prop({ required: true })
  password?: string;

  @ApiProperty({ required: true })
  @prop({ required: true, unique: true, trim: true })
  username?: string;

  @ApiProperty({ required: false })
  @prop()
  name?: string;

  @ApiProperty({ required: false })
  @prop()
  family?: string;

  @ApiProperty({ required: false })
  @prop()
  address?: string;

  @ApiProperty({ required: false })
  @prop()
  avatar?: string;

  @ApiProperty({ required: false })
  @prop()
  state?: string;

  @ApiProperty({ required: false })
  @prop()
  city?: string;

  @ApiProperty({ required: false })
  @prop()
  country?: string;

  @ApiProperty({ required: false })
  @prop({ required: false, trim: true })
  phone?: string;

  @ApiProperty({ required: false, default: 0 })
  //درامد کاربر
  @prop({ default: 0 })
  salary?: number;

  @ApiProperty({
    required: false,
    enum: USER_STATUS,
    readOnly: true,
    default: 'inactive',
  })
  @prop({
    required: true,
    type: String,
    enum: USER_STATUS,
    default: 'inactive',
  })
  status?: string;

  @ApiProperty({
    required: false,
    enum: USER_ROLE,
    readOnly: true,
    default: 'user',
  })
  @prop({ required: true, enum: USER_ROLE, default: 'user' })
  role?: string;

  // نوع برداشت شبا یا شماره حساب
  @ApiProperty({ required: false })
  @prop()
  withdrawsType?: string;

  //آدرس حساب
  @ApiProperty({ required: false })
  @prop()
  accountAddress?: string;

  @ApiProperty({ required: true, readOnly: true })
  @prop({ required: true, unique: true })
  identifierCode?: string;

  @ApiProperty({ type: User })
  @prop({ ref: User })
  parent?: Ref<User>;

  @ApiProperty()
  @prop({ default: 0 })
  subsetSalary?: number;

  @ApiProperty()
  @prop()
  keys?: Key;
}
