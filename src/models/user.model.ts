import { prop, ModelOptions, pre, post } from '@typegoose/typegoose';
//وضعیت های کاربران
const USER_STATUS = ['active', 'inactive', 'block'];



// نقش های کاربران
const USER_ROLE = ['admin', 'user'];

class UserKey {
  //کلید اعتبار سنجی کاربر
  @prop()
  activateKey: string;

  // مدت زمان اعتبار کلید
  @prop()
  activateExpire: Date;
}

@ModelOptions({ schemaOptions: { timestamps: true } })
export class User {
  readonly _id: string;

  @prop()
  name?: string;

  @prop()
  family?: string;

  @prop()
  address?: string;

  @prop()
  avatar?: string;

  @prop()
  state?: string;

  @prop()
  city?: string;

  @prop()
  country?: string;

  @prop({ required: true, unique: true, type: String,trim:true })
  phone: string;

  //درامد کاربر
  @prop({ default: 0 })
  salary?: number;

  @prop({
    required: true,
    type: String,
    enum: USER_STATUS,
    default: 'inactive',
  })
  status?: string;

  @prop({ required: true, enum: USER_ROLE, default: 'user' })
  role?: string;

  // نوع برداشت شبا یا شماره حساب
  @prop()
  withdrawsType?: string;

  //آدرس حساب
  @prop()
  accountAddress?: string;

  @prop()
  keys?: UserKey;
}
