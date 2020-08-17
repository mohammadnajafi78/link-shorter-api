import { prop, ModelOptions } from '@typegoose/typegoose';
import { BaseSchema } from '../core/baseSchema';
import { ApiProperty } from '@nestjs/swagger';

@ModelOptions({ schemaOptions: { timestamps: true } })
export class Notification extends BaseSchema {

  @ApiProperty({ required: true })
  @prop({ required: true })
  title?: string;

  @ApiProperty({ required: true })
  @prop({ required: true })
  description?: string;

  @ApiProperty({ required: true })
  @prop({ required: true })
  active?: boolean;
}
