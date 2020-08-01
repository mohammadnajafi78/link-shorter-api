import { Module } from '@nestjs/common';
import { SettingService } from './setting.service';
import { SettingController } from './setting.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Setting } from '../../models/setting.model';

@Module({
  imports:[TypegooseModule.forFeature([Setting])],
  providers: [SettingService],
  controllers: [SettingController]
})
export class SettingModule {}
