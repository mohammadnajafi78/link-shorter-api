import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Notification } from '../../models/notification.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class NotificationService {

  constructor(@InjectModel(Notification) private readonly notificationModel: ReturnModelType<typeof Notification>) {
  }

  async create(notification: Notification): Promise<{ notification: Notification }> {
    try {
      const newNotification = new this.notificationModel(notification);
      await newNotification.save();
      return { notification: newNotification };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(status?: boolean): Promise<{ notifications: Notification[] }> {
    try {
      const query = {};
      if (!!status) {
        Object.assign(query, { active: status });
      }
      const notifications = await this.notificationModel.find(query).sort({ 'createdAt': -1 });
      return { notifications };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, data: Notification): Promise<{ notification: Notification }> {
    try {
      const notification = await this.notificationModel.findByIdAndUpdate(id, data, { new: true });
      return { notification };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string): Promise<{ notification: Notification }> {
    try {
      const notification = await this.notificationModel.findByIdAndRemove(id);
      return { notification };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }


}
