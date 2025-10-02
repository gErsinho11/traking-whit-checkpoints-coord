import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, RequestMethod } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1', { exclude: [{ path: 'healthz', method: RequestMethod.GET }] });


  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  // await app.listen(process.env.PORT || 3000);
  // eslint-disable-next-line no-console
  // console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
  console.log(`🚀 Server running on http://0.0.0.0:${port}`);
}
bootstrap();
