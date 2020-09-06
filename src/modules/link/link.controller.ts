import {
  Controller,
  Body,
  Post,
  Req,
  Get,
  Query,
  Param,
  Put,
} from '@nestjs/common';
import { LinkService } from './link.service';
import { Link } from '../../models/link.model';
import { Auth } from '../../guards/auth.guard';
import { Visit } from '../../models/visit.model';
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CreateLinkDto, VisitResponseDto } from './link.dto';
import { ApiGetQuery } from '../../core/decorators';
import { VisitChartDto } from './visit.dto';

@ApiTags('Links')
@Controller('api/links')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @ApiOperation({ summary: 'ایجاد لینک کوتاه' })
  @ApiBody({ type: CreateLinkDto })
  @ApiOkResponse({ type: Link })
  @Post()
  async createLink(@Body() link: Link): Promise<{ link: Link }> {
    return await this.linkService.create(link);
  }

  @ApiOperation({ summary: 'لیست همه لینک ها' })
  @ApiGetQuery()
  @ApiQuery({ name: 'status', required: false })
  @ApiOkResponse({ type: [Link] })
  @Auth('admin')
  @Get('all')
  async getLinkList(
    @Query('search') search: string,
    @Query('skip') skip: number = 0,
    @Query('limit') limit: number = 10,
    @Query('status') status: string = 'active',
  ): Promise<{ links: Link[]; count: number }> {
    return await this.linkService.getLinkList(search, skip, limit, status);
  }

  @ApiOperation({ summary: 'گرفتن لینک با لینک کوتاه' })
  @ApiParam({ name: 'shortLink', description: 'لینک کوتاه' })
  @ApiOkResponse({ type: Link })
  @Get(':shortLink')
  async getLinkByShortLink(
    @Param('shortLink') shortLink: string,
  ): Promise<{ link: Link }> {
    return await this.linkService.getLinkByShortLink(shortLink);
  }

  @ApiOperation({ summary: 'بازدید یک لینک' })
  @ApiOkResponse({ type: VisitResponseDto })
  @Post('visit')
  async createVisit(
    @Body('link') link: string,
    @Req() req: any,
  ): Promise<{ status: boolean }> {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    return await this.linkService.createVisit(link, ip);
  }

  @ApiOperation({ summary: 'اطلاعات بازدید' })
  @ApiParam({ name: 'id', description: 'شناسه یک لینک' })
  @Auth()
  @Get('visits/:id')
  async getVisit(@Param('id') id: string): Promise<any> {
    return await this.linkService.getVisit(id);
  }

  @ApiOperation({ summary: 'لیست لینک های یک کاربر' })
  @ApiGetQuery()
  @ApiQuery({ name: 'status', required: false })
  @ApiOkResponse({ type: [Link] })
  @Auth()
  @Get()
  async getUserLink(
    @Req() request: any,
    @Query('limit') limit: number = 10,
    @Query('skip') skip: number = 0,
    @Query('search') search: string,
    @Query('status') status: string = 'active',
    @Query('showAds') showAds?: boolean,
  ): Promise<{ links: Link[]; count: number }> {
    return await this.linkService.getUserLink(
      search,
      request.user._id,
      skip,
      limit,
      status,
      showAds,
    );
  }

  @ApiOperation({ summary: 'بازدید یک ماه اخیر لینک های کاربر' })
  @ApiOkResponse({ type: [VisitChartDto] })
  @Auth()
  @Get('visit/all')
  async getUserVisits(
    @Req() req: any,
  ): Promise<{ visitChart: VisitChartDto[] }> {
    return await this.linkService.getAllVisit(req.user._id);
  }

  @ApiOperation({ summary: 'ویرایش یک لینک' })
  @ApiParam({ name: 'id', description: 'شناسه لینک' })
  @ApiBody({ type: Link })
  @ApiOkResponse({ type: VisitResponseDto })
  @Auth()
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() link: Link,
  ): Promise<{ status: boolean }> {
    return await this.linkService.update(id, link);
  }
}
