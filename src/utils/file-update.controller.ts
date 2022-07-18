import { ENV } from './../env';
import { storageOptions } from './util.function';
import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { commonResponse } from './output-message.utils';

@Controller('upload')
@ApiTags('Upload')
export class FileUploadController {
  constructor() {}

  @Post('file')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
      },
    },
  })
  @UseInterceptors(
    FileFieldsInterceptor([{ name: 'file', maxCount: 100 }], {
      storage: storageOptions,
    }),
  )
  uploadFile(
    @UploadedFiles()
    files: {
      file?: Express.Multer.File[];
    },
  ) {
    let data = [];
    files.file.forEach((file: any) => {
      data.push({
        originalName: file.originalname,
        link: `${file.filename}`,
        extension: file.originalname.split('.').pop(),
      });
    });
    return commonResponse(true, 'file upload successfully', data);
  }
}
