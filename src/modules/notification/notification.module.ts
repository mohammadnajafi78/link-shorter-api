import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Notification } from '../../models/notification.model';

@Module({
  imports: [TypegooseModule.forFeature([Notification])],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule {
}
