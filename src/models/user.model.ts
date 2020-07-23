import { prop } from '@typegoose/typegoose';

//وضعیت های کاربران
const USER_STATUS = ['active', 'inactive', 'block'];

// نقش های کاربران
const USER_ROLE = ['admin', 'user'];

//نوع های برداشت
const WITHDRAWS_TYPE = [
  // کارت به کارت
  'cart',
  // شبا
  'sheba',
];

class UserKey {
  //کلید اعتبار سنجی کاربر
  @prop()
  activateKey: string;

  // مدت زمان اعتبار کلید
  @prop()
  activateExpire: Date;
}

export class User {
  @prop()
  name?: string;

  @prop()
  family?: string;

  @prop()
  addres?: string;

  @prop()
  avatar?: string;

  @prop()
  state?: string;

  @prop()
  city?: string;

  @prop()
  country?: string;

  @prop({ required: true, unique: true, type: String })
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
  @prop({ enum: WITHDRAWS_TYPE })
  withdrawsType?: string;

  //شماره حساب
  @prop()
  acountNumber?: string;

  //شماره شبا
  @prop()
  shebaNumber?: string;

  @prop()
  keys?: UserKey;
}
