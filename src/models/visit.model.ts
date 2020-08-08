import { prop, ModelOptions, Ref} from '@typegoose/typegoose';
import { Link } from './link.model';

@ModelOptions({ schemaOptions: { timestamps: true } })
export class Visit {
  readonly  _id?:string;
  @prop({required:true})
  ip?: string;

  @prop({required:true})
  country?: string;

  @prop({required:true,default:false})
  isPay:boolean;

  @prop({ref:Link})
  link?:Ref<Link>
}
