import { Injectable } from "@nestjs/common";
import { KAVENEGAR_API_KEY, KAVENEGAR_SMS_TEMPLATE } from "../../config";
import * as kavenegar from "kavenegar";

@Injectable()
export class SmsService {
  private api = kavenegar.KavenegarApi({ apikey: KAVENEGAR_API_KEY });

  send(phone: string, key: string) {
    this.api.VerifyLookup({
      receptor: phone,
      token: key,
      template: KAVENEGAR_SMS_TEMPLATE
    });
  }
}
