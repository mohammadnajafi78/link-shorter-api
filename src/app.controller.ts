import { Controller, Get, Param, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({summary:'گرفتن یک عکس'})
  @ApiParam({name:'fileId',description:'آدرس فایل'})
  @Get('files/images/:fileId')
  async serveAvatars(
    @Param('fileId') fileId: string,
    @Res() res: Response,
  ): Promise<any> {
    res.sendFile(fileId, { root: 'files/images' });
  }
}
