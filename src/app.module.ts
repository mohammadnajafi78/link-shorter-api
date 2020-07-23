import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { MONGO_URI } from 'config';
import { UserModule } from './modules/user/user.module';
const TypegooseConnection = TypegooseModule.forRoot(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

@Module({
  imports: [TypegooseConnection, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
