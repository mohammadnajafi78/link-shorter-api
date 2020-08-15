import { Body, Controller, Get, Param, Post, Put, Req } from '@nestjs/common';
import { SettingService } from './setting.service';
import { Auth } from '../../guards/auth.guard';
import { Setting, WithdrawsMethod } from '../../models/setting.model';
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Settings')
@Controller('api/setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {
  }

  @ApiOperation({ summary: 'ایجاد تنظیمات' })
  @ApiBody({ type: Setting })
  @ApiOkResponse({ type: Setting })
  @Auth('admin')
  @Post()
  async create(@Body() setting: Setting): Promise<{ setting: Setting }> {
    return await this.settingService.create(setting);
  }

  @ApiOperation({ summary: 'گرفتن تنظیمات' })
  @ApiOkResponse({ type: [Setting] })
  @Auth()
  @Get()
  async get(): Promise<{ setting: Setting[] }> {
    return await this.settingService.get();
  }

  @ApiOperation({ summary: 'ویرایش تنظیمات' })
  @ApiBody({ type: Setting })
  @ApiParam({ name: 'id', description: 'شناسه تنطیمات' })
  @ApiOkResponse({ type: Setting })
  @Auth('admin')
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() setting: Setting,
  ): Promise<{ setting: Setting }> {
    return await this.settingService.update(id, setting);
  }

  @ApiOperation({ summary: 'گرفتن روش های برداشت' })
  @ApiOkResponse({ type: WithdrawsMethod })
  @Auth()
  @Get('method')
  async getMethod(
    @Req() request: any,
  ): Promise<{ withdrawsMethod: WithdrawsMethod }> {
    return await this.settingService.findMethod(request.user.withdrawsType);
  }
}
