import { prop } from '@typegoose/typegoose';

export class WithdrawsMethod {
  readonly _id?: string;
  @prop({ required: true })
  title: string;
  @prop({ required: true })
  description: string;
  @prop({ required: true })
  min: number;
  @prop({ required: true })
  active: boolean;
}

class CPC {
  @prop({ required: true })
  first?: number;

  @prop({ required: true })
  second?: number;

  @prop({ required: true })
  third?: number;

}

export class Setting {
  readonly _id?: string;

  @prop({ required: true })
    // تعرفه کلیک داخلی
  iranCPC: CPC;

  @prop({ required: true })
    // تعرقه کلیک خارجی
  foreignCPC: CPC;

  @prop({ required: true, type: WithdrawsMethod })
  withdrawsMethods: WithdrawsMethod[];
}
