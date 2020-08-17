import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { NotificationService } from './notification.service';
import { Notification } from '../../models/notification.model';
import { Auth } from '../../guards/auth.guard';

@ApiTags('Notifications')
@Controller('api/notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {
  }

  @ApiOperation({ summary: 'ایجاد اطلاعیه جدید' })
  @ApiBody({ type: Notification })
  @ApiOkResponse({ type: Notification })
  @Auth('admin')
  @Post()
  async create(@Body() notification: Notification): Promise<{ notification: Notification }> {
    return await this.notificationService.create(notification);
  }

  @ApiOperation({ summary: 'گرفتن اطلاعیه ها' })
  @ApiOkResponse({ type: [Notification] })
  @ApiQuery({ name: 'status', required: false })
  @Auth()
  @Get()
  async findAll(@Query('status') status: boolean): Promise<{ notifications: Notification[] }> {
    return await this.notificationService.findAll(status);
  }

  @ApiOperation({ summary: 'ویرایش اطلاعیه' })
  @ApiBody({ type: Notification })
  @ApiParam({ name: 'id', description: 'شناسه اطلاعیه' })
  @ApiOkResponse({ type: Notification })
  @Auth('admin')
  @Put(':id')
  async update(@Param('id') id: string, @Body() notification: Notification): Promise<{ notification: Notification }> {
    return await this.notificationService.update(id, notification);
  }

  @ApiOperation({ summary: 'حذف اطلاعیه' })
  @ApiParam({ name: 'id', description: 'شناسه اطلاعیه' })
  @ApiOkResponse({ type: Notification })
  @Auth('admin')
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ notification: Notification }> {
    return await this.notificationService.delete(id);
  }


}
