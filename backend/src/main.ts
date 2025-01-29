import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { TskvLogger } from './middlewares/tskv.logger';
import { DevLogger } from './middlewares/dev.logger';
import { JsonLogger } from './middlewares/json.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api/afisha');
  app.enableCors();

  const appConfig = app.get('CONFIG');
  if (appConfig.logger === 'JSON') {
    app.useLogger(new JsonLogger());
  } else if (appConfig.logger === 'TSKV') {
    app.useLogger(new TskvLogger());
  } else {
    app.useLogger(new DevLogger());
  }

  await app.listen(3000);
}
bootstrap();
