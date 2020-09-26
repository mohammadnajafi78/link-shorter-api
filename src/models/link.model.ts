import { prop, ModelOptions, Ref } from '@typegoose/typegoose';
import { User } from './user.model';
import validator from 'validator';

const LINK_STATUS = ['active', 'inactive', 'warning'];
import { BaseSchema } from 'src/core/baseSchema';
import { ApiProperty } from '@nestjs/swagger';

@ModelOptions({ schemaOptions: { timestamps: true } })
export class Link extends BaseSchema {
  @ApiProperty({ required: true })
  @prop({ required: true })
  mainLink?: string;

  @ApiProperty({ required: true })
  @prop({ required: true, unique: true })
  shortLink?: string;

  @ApiProperty({ required: true, enum: LINK_STATUS, default: 'active' })
  @prop({ required: true, default: 'active', enum: LINK_STATUS })
  status?: string;

  @ApiProperty({ type: User })
  @prop({ ref: User })
  user?: Ref<User>;

  @ApiProperty({ required: true })
  @prop({ required: true })
  showAds?: boolean;

  @ApiProperty()
  @prop({ default: true })
  popUp?: boolean;
}
