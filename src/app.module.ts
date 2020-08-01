import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { MONGO_URI } from 'config';
import { UserModule } from './modules/user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGaurd } from './guards/auth.guard';
import { User } from './models/user.model';
import { LinkModule } from './modules/link/link.module';
import { TicketModule } from './modules/ticket/ticket.module';
import { WithdrawsModule } from './modules/withdraws/withdraws.module';
import { SettingModule } from './modules/setting/setting.module';
import { MethodsModule } from './modules/methods/methods.module';
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
    UserModule,
    LinkModule,
    TicketModule,
    WithdrawsModule,
    SettingModule,
    MethodsModule,
  ],
  controllers: [AppController],
  providers: [{ provide: APP_GUARD, useClass: AuthGaurd }, AppService],
})
export class AppModule {}
