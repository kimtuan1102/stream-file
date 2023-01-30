import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Req,
} from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import * as ExcelJS from 'exceljs';

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

      req['busboy'].on('file', async (fieldname, file, filename) => {
        console.log(filename);
        console.log(fieldname);
        reject({ x: 1 });
        const workbookReader = new ExcelJS.stream.xlsx.WorkbookReader(file, {});
        for await (const worksheetReader of workbookReader) {
          for await (const row of worksheetReader) {
            console.log('Raw text:\n' + row.values);
          }
        }
        file.on('close', () => {
          resolve({ ok: true });
        });
      });
    })
      .then(() => {
        return { ok: true };
      })
      .catch((e) => {
        throw new BadRequestException({ x: 1 });
      });
  }
}
