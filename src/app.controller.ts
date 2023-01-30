import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Req,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post('upload-file')
  uploadFile(@Req() req: Request) {
    return new Promise((resolve, reject) => {
      req.pipe(req['busboy']); // Pipe it trough busboy

      req['busboy'].on('file', (fieldname, file, filename) => {
        console.log(filename);
        console.log(fieldname);
        file.on('data', (chunk) => {

        });
        file.on('close', () => {
          return { ok: true };
        });
      });
    });
  }
}
