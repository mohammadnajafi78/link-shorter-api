import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { Ticket } from '../../models/ticket.model';
import { Auth } from '../../guards/auth.guard';

@Controller('api/tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {
  }

  @Post()
  async create(@Body() ticket: Ticket): Promise<{ ticket: Ticket }> {
    return await this.ticketService.create(ticket);
  }

  @Auth('admin')
  @Get()
  async getTicketList(
    @Query('search') search: string,
    @Query('skip') skip: number = 0,
    @Query('limit') limit: number = 10,
    @Query('read') read: boolean = false,
  ): Promise<{ tickets: Ticket[]; count: number }> {
    return await this.ticketService.getTicketList(search, skip, limit, read);
  }

  @Auth('admin')
  @Get(':id')
  async getTicket(@Param('id') id: string): Promise<{ ticket: Ticket }> {
    return await this.ticketService.getTicket(id);
  }

  @Auth('admin')
  @Put(':id')
  async readTicket(@Param('id') id: string): Promise<{ ticket: Ticket }> {
    return await this.ticketService.readTicket(id);
  }

  @Auth('admin')
  @Post('email')
  sendResponse(
    @Body('email') email: string,
    @Body('subject') subject: string,
    @Body('text') text: string,
  ) {
    this.ticketService.sendResponse(email, subject, text);
  }

}
