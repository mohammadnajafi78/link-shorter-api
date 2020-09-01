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
import { WithdrawsService } from './withdraws.service';
import { Auth } from '../../guards/auth.guard';
import { Withdraws } from '../../models/whithdraws.model';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ApiGetQuery } from '../../core/decorators';

@ApiTags('Withdraws')
@Controller('api/withdraws')
export class WithdrawsController {
  constructor(private readonly withdrawsService: WithdrawsService) {}

  @ApiOperation({ summary: 'ایجاد برداشت جدید' })
  @ApiOkResponse({ type: Withdraws })
  @Auth()
  @Post()
  async create(
    @Body('amount') amount: number,
    @Req() request: any,
  ): Promise<{ withdraws: Withdraws }> {
    return await this.withdrawsService.create(request.user._id, amount);
  }

  @ApiOperation({ summary: 'گرفتن لیست برداشت ها' })
  @ApiGetQuery()
  @ApiQuery({ name: 'status', required: false })
  @ApiOkResponse({ type: [Withdraws] })
  @Auth('admin')
  @Get('all')
  async getWithdrawsList(
    @Query('search') search: string,
    @Query('skip') skip: number = 0,
    @Query('limit') limit: number = 10,
    @Query('status') status: string = 'waiting',
  ): Promise<{ withdraws: Withdraws[]; count: number }> {
    return await this.withdrawsService.getWithdrawsList(
      search,
      skip,
      limit,
      status,
    );
  }

  @ApiOperation({ summary: 'لیست برداشت کاربران' })
  @ApiGetQuery()
  @ApiOkResponse({ type: [Withdraws] })
  @Auth()
  @Get()
  async getUserWithdrawsList(
    @Req() request: any,
  ): Promise<{ withdraws: Withdraws[] }> {
    return await this.withdrawsService.getUserWithdrawsList(request.user._id);
  }

  @ApiOperation({ summary: 'گرفتن اطلاعات یک برداشت' })
  @ApiParam({ name: 'id', description: 'شناسه برداشت' })
  @ApiOkResponse({ type: Withdraws })
  @Auth()
  @Get(':id')
  async getWithdrawsById(
    @Param('id') id: string,
  ): Promise<{ withdraws: Withdraws }> {
    return await this.withdrawsService.getWithdrawsById(id);
  }

  @ApiOperation({ summary: 'موفق آمیز کردن برداشت' })
  @ApiParam({ name: 'id', description: 'شناسه برداشت' })
  @ApiOkResponse({ type: Withdraws })
  @Auth('admin')
  @Put('success/:id')
  async setWithdrawsSuccess(
    @Param('id') id: string,
    @Body('trackNumber') trackNumber: number,
  ): Promise<{ withdraws: Withdraws }> {
    return await this.withdrawsService.setWithdrawsSuccess(id, trackNumber);
  }

  @ApiOperation({ summary: 'لغو برداشت' })
  @ApiParam({ name: 'id', description: 'شناسه برداشت' })
  @ApiOkResponse({ type: Withdraws })
  @Auth('admin')
  @Put('cancel/:id')
  async setWithdrawsCancel(
    @Param('id') id: string,
  ): Promise<{ withdraws: Withdraws }> {
    return await this.withdrawsService.setWithdrawsCancel(id);
  }
}
