import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { Ticket } from '../../models/ticket.model';
import { ReturnModelType } from '@typegoose/typegoose';
import * as nodemailer from 'nodemailer';
@Injectable()
export class TicketService {
  constructor(@InjectModel(Ticket) private readonly ticketModel:ReturnModelType<typeof Ticket> ) {}

  // ایجاد یک تیکت پشتیبانی
  async create(ticket:Ticket):Promise<{ ticket:Ticket }>{
      try {
        const newTicket = new this.ticketModel(ticket);
        await newTicket.save();
        return { ticket:newTicket };
      }catch (error) {
        throw new HttpException(error,HttpStatus.BAD_REQUEST);
      }
  }

  // گرفتن لیست تیکت ها
  async getTicketList(
    search:string,
    skip:number,
    limit:number,
    read:boolean
  ):Promise<{ tickets:Ticket[];count:number }>{
      try {
          const query = {read};
          if(!!search){
            Object.assign(query,{subject:new RegExp(search,'ig')})
          }
          const tickets = await this.ticketModel.find(query)
            .skip(Number(skip))
            .limit(Number(limit));
          const count = await this.ticketModel.countDocuments(query);
          return {tickets,count}
      }catch (error) {
        throw new HttpException(error,HttpStatus.BAD_REQUEST);
      }
  }

  // گرفتن یک تیکت
  async getTicket(id:string):Promise<{ ticket:Ticket }>{
    try {
      const ticket = await this.ticketModel.findById(id);
      return {ticket}
    }catch (error) {
      throw new HttpException(error,HttpStatus.BAD_REQUEST);
    }
  }


  sendResponse(){
    try {
      // import nodemailer (after npm install nodemailer)
      const nodemailer = require('nodemailer');

// config for mailserver and mail, input your data
      const config = {
        mailserver: {
          host: 'smtp.ethereal.email',
          port: 587,
          secure: false,
          auth: {
            user: 'mohammad.dev@gmail.com',
            pass: 'mohammad1378'
          },
          connectionTimeout: 5 * 60 * 1000,
        },
        mail: {
          from: 'mohammad.dev@gmail.com',
          to: 'mohmmadnjf950@gmail.com',
          subject: 'Hey',
          text: 'Testing Nodemailer'
        }
      };

      const sendMail = async ({ mailserver, mail }) => {
        // create a nodemailer transporter using smtp
        let transporter = nodemailer.createTransport(mailserver);

        // send mail using transporter
        let info = await transporter.sendMail(mail);

        console.log(`Preview: ${nodemailer.getTestMessageUrl(info)}`);
      };
      sendMail(config).catch(console.error);
    }catch (error) {
      throw new HttpException(error,HttpStatus.BAD_REQUEST);
    }
  }


  // خواندن یک تیکت
  async readTicket(id:string):Promise<{ ticket:Ticket }>{
    try {
      const ticket = await this.ticketModel.findByIdAndUpdate(id,{read:true},{new:true});
      return {ticket}
    }catch (error) {
      throw new HttpException(error,HttpStatus.BAD_REQUEST);
    }
  }

}
