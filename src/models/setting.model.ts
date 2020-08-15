import { prop } from '@typegoose/typegoose';
import { BaseSchema } from 'src/core/baseSchema';
import { ApiProperty } from '@nestjs/swagger';

export class WithdrawsMethod extends BaseSchema {

  @ApiProperty({ required: true })
  @prop({ required: true })
  title: string;

  @ApiProperty({ required: true })
  @prop({ required: true })
  description: string;

  @ApiProperty({ required: true })
  @prop({ required: true })
  min: number;

  @ApiProperty({ required: true })
  @prop({ required: true })
  active: boolean;
}

class CPC {
  @ApiProperty({ required: true })
  @prop({ required: true })
  first?: number;

  @ApiProperty({ required: true })
  @prop({ required: true })
  second?: number;

  @ApiProperty({ required: true })
  @prop({ required: true })
  third?: number;

}

export class Setting extends BaseSchema {

  @ApiProperty({ type: CPC })
  @prop({ required: true })
    // تعرفه کلیک داخلی
  iranCPC: CPC;

  @ApiProperty({ type: CPC })
  @prop({ required: true })
    // تعرقه کلیک خارجی
  foreignCPC: CPC;

  @ApiProperty({ type: WithdrawsMethod })
  @prop({ required: true, type: WithdrawsMethod })
  withdrawsMethods: WithdrawsMethod[];
}
