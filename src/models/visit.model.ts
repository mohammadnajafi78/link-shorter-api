import { prop, ModelOptions, Ref} from '@typegoose/typegoose';
import { Link } from './link.model';

// @ModelOptions({ schemaOptions: { timestamps: true } })
export class Visit {
  readonly  _id?:string;
  @prop()
  country?: string;

  @prop()
  count?: number;

  @prop({ref:Link})
  link?:Ref<Link>
}
