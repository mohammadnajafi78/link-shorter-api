import { User } from './../../models/user.model';
import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import { Ticket } from '../../models/ticket.model';

@Module({
  imports: [
    TypegooseModule.forFeature([Ticket]),
    TypegooseModule.forFeature([User]),
  ],
  providers: [TicketService],
  controllers: [TicketController],
})
export class TicketModule {}
