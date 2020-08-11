import { prop, ModelOptions, Ref } from '@typegoose/typegoose';
import { Link } from './link.model';

export class CountVisit {
  @prop({ default: false })
  isPay: boolean;
}

@ModelOptions({ schemaOptions: { timestamps: true } })
export class Visit {
  readonly _id?: string;
  @prop({ required: true })
  ip?: string;

  @prop({ required: true })
  country?: string;

  @prop({ default: 1, max: 3 })
  count?: number;

  @prop({ default: 0 })
  isPay?: number;

  @prop({ ref: Link })
  link?: Ref<Link>;
}
