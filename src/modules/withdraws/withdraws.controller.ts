import { Body, Controller, Get, Param, Post, Put, Query, Req } from '@nestjs/common';
import { WithdrawsService } from './withdraws.service';
import { Auth } from '../../guards/auth.guard';
import { Withdraws } from '../../models/whithdraws.model';

@Controller('api/withdraws')
export class WithdrawsController {
  constructor(private readonly withdrawsService:WithdrawsService) {}

  @Auth()
  @Post()
  async create(
    @Body('amount')amount:number,
    @Req()request:any
  ):Promise<{ withdraws:Withdraws }>{
      return await this.withdrawsService.create(request.user._id,amount);
  }

  @Auth('admin')
  @Get('all')
  async getWithdrawsList(
    @Query('search') search:string,
    @Query('skip') skip:number = 0,
    @Query('limit') limit:number = 10,
    @Query('status') status:string = 'waiting'
  ):Promise<{withdraws:Withdraws[];count: number}>{
    return await this.withdrawsService.getWithdrawsList(search,skip,limit,status);
  }

  @Auth()
  @Get()
  async getUserWithdrawsList(
    @Query('skip') skip:number = 0,
    @Query('limit') limit:number = 10,
    @Req() request:any
  ):Promise<{ withdraws:Withdraws[],count:number }>{
    return await this.withdrawsService.getUserWithdrawsList(skip,limit,request.user._id);
  }

  @Auth()
  @Get(':id')
  async getWithdrawsById(@Param('id')id:string):Promise<{ withdraws:Withdraws }>{
    return await this.withdrawsService.getWithdrawsById(id);
  }

  @Auth('admin')
  @Put('success/:id')
  async setWithdrawsSuccess(
    @Param('id') id:string,
    @Body('trackNumber') trackNumber:number
  ):Promise<{ withdraws:Withdraws }>{
    return await this.withdrawsService.setWithdrawsSuccess(id,trackNumber);
  }

  @Auth('admin')
  @Put('cancel/:id')
  async setWithdrawsCancel(@Param('id') id:string ):Promise<{ withdraws:Withdraws }>{
    return await this.withdrawsService.setWithdrawsCancel(id);
  }

}
