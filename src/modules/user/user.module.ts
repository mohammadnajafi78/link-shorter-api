import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from 'src/models/user.model';
import { Setting } from '../../models/setting.model';
import { Visit } from '../../models/visit.model';
import { Link } from '../../models/link.model';
import { SmsService } from '../../services/sms-service/sms-service';
@Module({
  imports: [
    TypegooseModule.forFeature([User]),
    TypegooseModule.forFeature([Setting]),
    TypegooseModule.forFeature([Visit]),
    TypegooseModule.forFeature([Link])
  ],
  providers: [UserService,SmsService],
  controllers: [UserController],
})
export class UserModule {}
