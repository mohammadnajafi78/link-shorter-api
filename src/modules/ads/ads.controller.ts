import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AdsService } from './ads.service';
import { Auth } from '../../guards/auth.guard';
import { Ads } from '../../models/ads.model';

@Controller('api/ads')
export class AdsController {
  constructor(private readonly adsService:AdsService) {}

  @Auth('admin')
  @Post()
  async create(@Body()ads:Ads):Promise<{ads:Ads}>{
    return await this.adsService.create(ads);
  }

  @Get()
  async findAll(
    @Query('skip') skip:number = 0,
    @Query('limit') limit:number = 10
  ):Promise<{ads:Ads[],count:number}>{
    return await this.adsService.getAll(skip,limit);
  }

  @Auth('admin')
  @Put(':id')
  async getAll(
    @Param('id') id:string,
    @Body() ads:Ads
  ):Promise<{ads:Ads}>{
    return await this.adsService.update(id,ads)
  }

  @Auth('admin')
  @Delete(':id')
  async delete(@Param('id') id:string):Promise<{ads:Ads}>{
    return this.adsService.delete(id)
  }



}
