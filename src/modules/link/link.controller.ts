import { Controller, Body, Post, Req, Get, Query, Param, Ip, Put, Delete } from '@nestjs/common';
import { LinkService } from './link.service';
import { Link } from '../../models/link.model';
import { Auth } from '../../guards/auth.guard';
import { Visit } from '../../models/visit.model';

@Controller('api/links')
export class LinkController {
  constructor(private readonly linkService: LinkService) {
  }

  @Post()
  async createLink(
    @Body('') link:Link,
  ): Promise<{ link: Link }> {
    return await this.linkService.create(link);
  }

  @Auth('admin')
  @Get('all')
  async getLinkList(
    @Query('search') search: string,
    @Query('skip') skip: number = 0,
    @Query('limit') limit: number = 10,
    @Query('status') status: string = 'active'
  ): Promise<{ links: Link[]; count: number }> {
    return await this.linkService.getLinkList(search, skip, limit, status);
  }

  @Get(':shortLink')
  async getLinkByShortLink(@Param('shortLink')shortLink: string, @Ip()ip: string): Promise<{ link: Link }> {
    return await this.linkService.getLinkByShortLink(shortLink);
  }

  @Auth()
  @Get('visits/:id')
  async getLinkById(@Param('id')id: string): Promise<{ visits: Visit[] }> {
    return await this.linkService.getLinkById(id);
  }

  @Auth()
  @Get()
  async getUserLink(
    @Req() request: any,
    @Query('limit') limit: number = 10,
    @Query('skip') skip: number = 0,
    @Query('search') search: string,
    @Query('status') status: string = 'active'
  ): Promise<{ links: Link[]; count: number }> {
    return await this.linkService.getUserLink(search, request.user._id, skip, limit, status);
  }

  @Auth('admin')
  @Delete(':id')
  async delete(@Param('id') id:string):Promise<{link:Link}>{
    return  await this.linkService.delete(id);
  }

  @Auth()
  @Put(':id')
  async update(@Param('id') id:string,@Body() link:Link ):Promise<{status:boolean}>{
    return await this.linkService.update(id,link)
  }

}


