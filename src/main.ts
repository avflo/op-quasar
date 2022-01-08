import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { AllExceptionsFilter } from './exception.filter';
import * as helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common/pipes';

async function bootstrap() {
  // 🐱 NESTJS
  const app = await NestFactory.create(AppModule);
  // HANDLE EXCEPTIONS
  app.useGlobalFilters(new AllExceptionsFilter());
  app.useGlobalPipes(new ValidationPipe());

  // CONFIG
  const config = app.get<ConfigService>(ConfigService);
  app.use(helmet());

  // ⚡ INIT SERVER
  await app.listen(config.get('port'));

  // EXIT EVENT LISTENER
  process.on('SIGINT', function () {
    console.log('Gracefully shutting down from SIGINT (Ctrl-C)');
    // some other closing procedures go here
    process.exit(1);
  });
}
bootstrap();
