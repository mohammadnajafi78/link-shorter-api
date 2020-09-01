import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Ticket } from '../../models/ticket.model';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(Ticket)
    private readonly ticketModel: ReturnModelType<typeof Ticket>,
  ) {}

  // ایجاد یک تیکت پشتیبانی
  async create(id: string, ticket: Ticket): Promise<{ ticket: Ticket }> {
    try {
      ticket.user = id;
      const newTicket = new this.ticketModel(ticket);
      await newTicket.save();
      return { ticket: newTicket };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  // گرفتن لیست تیکت ها
  async getTicketList(
    search: string,
    skip: number,
    limit: number,
    read: boolean,
  ): Promise<{ tickets: Ticket[]; count: number }> {
    try {
      const query = { read };
      if (!!search) {
        Object.assign(query, { subject: new RegExp(search, 'ig') });
      }
      const tickets = await this.ticketModel
        .find(query)
        .skip(Number(skip))
        .limit(Number(limit))
        .sort({ createdAt: -1 });
      const count = await this.ticketModel.countDocuments(query);
      return { tickets, count };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  // گرفتن یک تیکت
  async getTicket(id: string): Promise<{ ticket: Ticket }> {
    try {
      const ticket = await this.ticketModel.findById(id);
      return { ticket };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  // خواندن یک تیکت
  async readTicket(id: string): Promise<{ ticket: Ticket }> {
    try {
      const ticket = await this.ticketModel.findByIdAndUpdate(
        id,
        { read: true },
        { new: true },
      );
      return { ticket };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async sendResponse(id: string, data: Ticket): Promise<{ status: boolean }> {
    try {
      await this.ticketModel.findByIdAndUpdate(id, data, { new: true });

      return { status: true };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async getUserTickets(id: string): Promise<{ tickets: Ticket[] }> {
    try {
      const tickets = await this.ticketModel.find({ user: id });
      return { tickets };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
