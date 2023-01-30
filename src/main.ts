import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as busboy from 'connect-busboy';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(
    busboy({
      highWaterMark: 2 * 1024 * 1024, // Set 2MiB buffer
    }),
  ); // Insert the busboy middle-ware
  await app.listen(3000);
}
bootstrap();
