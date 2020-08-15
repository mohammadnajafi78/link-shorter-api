import { prop, Ref, ModelOptions } from '@typegoose/typegoose';
import { User } from './user.model';
import { BaseSchema } from '../core/baseSchema';
import { ApiProperty } from '@nestjs/swagger';

const WITHDRAWS_STATUS = ['success', 'waiting', 'cancel'];

@ModelOptions({ schemaOptions: { timestamps: true } })
export class Withdraws extends BaseSchema {

  //کاربری که میخواهد برداشت کند
  @ApiProperty({ type: User })
  @prop({ ref: User })
  user?: Ref<User>;

  // وضعیت برداشت شامل موفق، در انتظار و لفو شده
  @ApiProperty({ enum: WITHDRAWS_STATUS, default: 'waiting' })
  @prop({ enum: WITHDRAWS_STATUS, default: 'waiting' })
  status?: string;

  @ApiProperty({ required: true })
  @prop({ required: true })
  type: string;
  // مقدار برداشت

  @ApiProperty({ required: true })
  @prop({ required: true })
  amount?: number;

  @ApiProperty({ required: false })
  @prop()
  trackNumber?: number;
}
