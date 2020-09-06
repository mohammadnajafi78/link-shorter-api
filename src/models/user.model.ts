import { prop, ModelOptions, pre, post, Ref } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { BaseSchema } from 'src/core/baseSchema';
//وضعیت های کاربران
const USER_STATUS = ['active', 'inactive', 'block'];

// نقش های کاربران
const USER_ROLE = ['admin', 'user'];

class UserKey {
  //کلید اعتبار سنجی کاربر
  @prop()
  activateKey?: string;

  // مدت زمان اعتبار کلید
  @prop()
  activateExpire?: Date;
}

@ModelOptions({ schemaOptions: { timestamps: true } })
export class User extends BaseSchema {
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

  @ApiProperty({ required: true })
  @prop({ required: true, unique: true, type: String, trim: true })
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

  @prop()
  keys?: UserKey;

  @ApiProperty({ required: true, readOnly: true })
  @prop({ unique: true, required: true })
  identifierCode?: string;

  @ApiProperty({ type: User })
  @prop({ ref: User })
  parent?: Ref<User>;

  @ApiProperty()
  @prop({ default: 0 })
  subsetSalary?: number;
}
