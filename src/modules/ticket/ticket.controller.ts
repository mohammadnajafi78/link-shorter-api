import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { Ticket } from '../../models/ticket.model';
import { Auth } from '../../guards/auth.guard';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ApiGetQuery } from '../../core/decorators';

@ApiTags('Tickets')
@Controller('api/tickets')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @ApiOperation({ summary: 'ایجاد تیکت جدید' })
  @ApiBody({ type: Ticket })
  @ApiOkResponse({ type: Ticket })
  @Auth()
  @Post()
  async create(
    @Req() req: any,
    @Body() ticket: Ticket,
  ): Promise<{ ticket: Ticket }> {
    return await this.ticketService.create(req.user._id, ticket);
  }

  @ApiOperation({ summary: 'گرفتن لیست تیکت ها' })
  @ApiGetQuery()
  @ApiQuery({ name: 'read', required: false })
  @ApiOkResponse({ type: [Ticket] })
  @Auth('admin')
  @Get('all')
  async getTicketList(
    @Query('search') search: string,
    @Query('skip') skip: number = 0,
    @Query('limit') limit: number = 10,
    @Query('read') read: boolean = false,
  ): Promise<{ tickets: Ticket[]; count: number }> {
    return await this.ticketService.getTicketList(search, skip, limit, read);
  }

  @ApiOperation({ summary: 'گرفتن یک لینک' })
  @ApiParam({ name: 'id', description: 'شناسه تیکت' })
  @ApiOkResponse({ type: Ticket })
  @Auth('admin')
  @Get(':id')
  async getTicket(@Param('id') id: string): Promise<{ ticket: Ticket }> {
    return await this.ticketService.getTicket(id);
  }

  @ApiOperation({ summary: 'خوانده شدن یک تیکت' })
  @ApiParam({ name: 'id', description: 'شنساسه تیکت' })
  @ApiOkResponse({ type: Ticket })
  @Auth('admin')
  @Put(':id')
  async readTicket(@Param('id') id: string): Promise<{ ticket: Ticket }> {
    return await this.ticketService.readTicket(id);
  }

  @ApiOperation({ summary: 'پاسخ دادن به تیکت پشتیبانی' })
  @Auth()
  @Post('response')
  async sendResponse(
    @Body() id: string,
    @Body() ticket: Ticket,
  ): Promise<{ status: boolean }> {
    return await this.ticketService.sendResponse(id, ticket);
  }

  @ApiOperation({ summary: 'گرفتن تیکت های کاربر' })
  @ApiOkResponse({ type: [Ticket] })
  @Auth()
  @Get()
  async getUserTickets(@Req() req: any): Promise<{ tickets: Ticket[] }> {
    return await this.ticketService.getUserTickets(req.user._id);
  }
}
