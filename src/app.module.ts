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
import { SmsService } from './services/sms-service/sms-service';
import { AdsModule } from './modules/ads/ads.module';
import { UploadModule } from './modules/upload/upload.module';
import { ServeStaticModule,ServeStaticModuleOptions } from '@nestjs/serve-static';
import {join} from 'path'
const TypegooseConnection = TypegooseModule.forRoot(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

@Module({
  imports: [
    TypegooseConnection,
    // ServeStaticModuleOptions.forRoot({
    //   serveStaticOptions:join(__dirname,'..','files')
    // }),
    TypegooseModule.forFeature([User]),
    UserModule,
    LinkModule,
    TicketModule,
    WithdrawsModule,
    SettingModule,
    AdsModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [{ provide: APP_GUARD, useClass: AuthGaurd }, AppService, SmsService],
})
export class AppModule {}
