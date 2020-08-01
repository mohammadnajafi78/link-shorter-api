import { Module } from '@nestjs/common';
import { LinkController } from './link.controller';
import { LinkService } from './link.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { Link } from 'src/models/link.model';
import { Visit } from '../../models/visit.model';
@Module({
  imports: [
    TypegooseModule.forFeature([Link]),
    TypegooseModule.forFeature([Visit])
  ],
  controllers: [LinkController],
  providers: [LinkService],
})
export class LinkModule {}
