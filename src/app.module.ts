import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { MONGO_URI } from 'src/config';
import { UserModule } from './modules/user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGaurd } from './guards/auth.guard';
import { User } from './models/user.model';
import { LinkModule } from './modules/link/link.module';
import { TicketModule } from './modules/ticket/ticket.module';
import { WithdrawsModule } from './modules/withdraws/withdraws.module';
import { SettingModule } from './modules/setting/setting.module';
import { AdsModule } from './modules/ads/ads.module';
import { UploadModule } from './modules/upload/upload.module';
import { NotificationModule } from './modules/notification/notification.module';
const TypegooseConnection = TypegooseModule.forRoot(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

@Module({
  imports: [
    TypegooseConnection,
    TypegooseModule.forFeature([User]),
    UploadModule,
    UserModule,
    LinkModule,
    TicketModule,
    WithdrawsModule,
    SettingModule,
    AdsModule,
    NotificationModule,
  ],
  controllers: [AppController],
  providers: [{ provide: APP_GUARD, useClass: AuthGaurd }, AppService],
})
export class AppModule {}
