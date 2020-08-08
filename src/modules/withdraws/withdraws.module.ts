import { Module } from '@nestjs/common';
import { WithdrawsController } from './withdraws.controller';
import { WithdrawsService } from './withdraws.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Withdraws } from '../../models/whithdraws.model';
import { User } from '../../models/user.model';
import { Setting } from '../../models/setting.model';

@Module({
  imports:[
    TypegooseModule.forFeature([Withdraws]),
    TypegooseModule.forFeature([User]),
    TypegooseModule.forFeature([Setting])
],

  controllers: [WithdrawsController],
  providers: [WithdrawsService]
})
export class WithdrawsModule {}
