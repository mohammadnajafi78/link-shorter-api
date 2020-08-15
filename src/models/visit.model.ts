import { prop, ModelOptions, Ref } from '@typegoose/typegoose';
import { Link } from './link.model';
import { BaseSchema } from '../core/baseSchema';
import { ApiProperty } from '@nestjs/swagger';

export class CountVisit {
  @prop({ default: false })
  isPay: boolean;
}

@ModelOptions({ schemaOptions: { timestamps: true } })
export class Visit extends BaseSchema {
  @ApiProperty({ required: true })
  @prop({ required: true })
  ip?: string;

  @ApiProperty({ required: true })
  @prop({ required: true })
  country?: string;

  @ApiProperty({ default: 1 })
  @prop({ default: 1, max: 3 })
  count?: number;

  @ApiProperty({ default: 0 })
  @prop({ default: 0 })
  isPay?: number;

  @ApiProperty({ type: Link })
  @prop({ ref: Link })
  link?: Ref<Link>;
}
