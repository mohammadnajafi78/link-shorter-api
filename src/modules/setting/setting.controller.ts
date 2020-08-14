import { Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import { SettingService } from './setting.service';
import { Auth } from '../../guards/auth.guard';
import { Setting, WithdrawsMethod } from '../../models/setting.model';

@Controller('api/setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @Auth('admin')
  @Post()
  async create(@Body() setting: Setting): Promise<{ setting: Setting }> {
    return await this.settingService.create(setting);
  }

  @Auth()
  @Get()
  async get(): Promise<{ setting: Setting[] }> {
    return await this.settingService.get();
  }

  @Auth('admin')
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() setting: Setting,
  ): Promise<{ setting: Setting }> {
    return await this.settingService.update(id, setting);
  }

  @Auth()
  @Get('method')
  async getMethod(
    @Req() request: any,
  ): Promise<{ withdrawsMethod: WithdrawsMethod }> {
    return await this.settingService.findMethod(request.user.withdrawsType);
  }
}
