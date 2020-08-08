import { Module } from '@nestjs/common';
import { AdsService } from './ads.service';
import { AdsController } from './ads.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Ads } from '../../models/ads.model';

@Module({
  imports:[TypegooseModule.forFeature([Ads])],
  providers: [AdsService],
  controllers: [AdsController]
})
export class AdsModule {}
