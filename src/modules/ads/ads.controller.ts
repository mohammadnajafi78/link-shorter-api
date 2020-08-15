import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { AdsService } from './ads.service';
import { Auth } from '../../guards/auth.guard';
import { Ads } from '../../models/ads.model';
import { ApiBody, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ApiGetQuery } from '../../core/decorators';


@ApiTags('Ads')
@Controller('api/ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {
  }

  @ApiOperation({ summary: 'ایجاد تبلیغ جدید' })
  @ApiBody({ type: Ads })
  @ApiOkResponse({ type: Ads })
  @Auth('admin')
  @Post()
  async create(@Body()ads: Ads): Promise<{ ads: Ads }> {
    return await this.adsService.create(ads);
  }

  @ApiOperation({ summary: 'گرفتن لیست تبلیغات' })
  @ApiGetQuery()
  @ApiOkResponse({ type: [Ads] })
  @Get()
  async findAll(
    @Query('skip') skip: number = 0,
    @Query('limit') limit: number = 10,
  ): Promise<{ ads: Ads[], count: number }> {
    return await this.adsService.getAll(skip, limit);
  }

  @ApiOperation({ summary: 'ویرایش یک تبلیغ' })
  @ApiParam({ name: 'id', description: 'شناسه تبلیغ' })
  @ApiOkResponse({ type: Ads })
  @Auth('admin')
  @Put(':id')
  async getAll(
    @Param('id') id: string,
    @Body() ads: Ads,
  ): Promise<{ ads: Ads }> {
    return await this.adsService.update(id, ads);
  }

  @ApiOperation({ summary: 'حذف یک تبلیغ' })
  @ApiParam({ name: 'id', description: 'شناسه تبلیغ' })
  @ApiBody({ type: Ads })
  @ApiOkResponse({ type: Ads })
  @Auth('admin')
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<{ ads: Ads }> {
    return this.adsService.delete(id);
  }


}
