import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Ticket } from '../../models/ticket.model';
import { ReturnModelType } from '@typegoose/typegoose';
import * as nodemailer from 'nodemailer';

@Injectable()
export class TicketService {
  constructor(@InjectModel(Ticket) private readonly ticketModel: ReturnModelType<typeof Ticket>) {
  }

  // ایجاد یک تیکت پشتیبانی
  async create(ticket: Ticket): Promise<{ ticket: Ticket }> {
    try {
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
      const tickets = await this.ticketModel.find(query)
        .skip(Number(skip))
        .limit(Number(limit))
        .sort({ 'createdAt': -1 });
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
      const ticket = await this.ticketModel.findByIdAndUpdate(id, { read: true }, { new: true });
      return { ticket };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  sendResponse(email: string, subject: string, text: string) {
    const transporter =
      nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'mohammad.dev1378@gmail.com',
          pass: 'mohammad1378',
        },
      });
    const mailOptions = {
      from: 'mohammad.dev1378@gmail.com',
      to: email,
      subject: subject,
      text: text,
    };
    transporter.sendMail(mailOptions,
      (error, info) => {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
  }
}
