import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  HttpException,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import * as path from 'path';
import { diskStorage } from 'multer';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Upload')
@Controller('api/upload')
export class UploadController {

  @ApiOperation({ summary: 'آپلود عکس' })
  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'files/images',
        filename: (req, file, cb) => {
          // Generating a 32 random chars long string
          const randomName = Array(16)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          //Calling the callback passing the random name generated with the original extension name
          cb(
            null,
            `${Date.now()}-${randomName}${path.extname(file.originalname)}`,
          );
        },
      }),
      fileFilter: function(req: Request, file, callback) {
        const ext = path.extname(file.originalname);

        if (!['.png', '.jpg', '.jpeg', '.gif'].some(e => ext === e)) {
          req.body.error = 'نوع فایل باید تصویر باشد .';
          return callback(null, false);
        }

        if (file.size > 8 * 1024 * 1024) {
          req.body.error = 'اندازه فایل کمتر از 8 مگابایت باشد .';
          return callback(null, false);
        }

        callback(null, true);
      },
    }),
  )
  uploadFile(@UploadedFile('file') file, @Body('error') error: string) {
    try {
      if (!!error) throw error;
      return { url: `${file.destination}/${file.filename}` };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

}
