import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.enableCors({
    "origin": "http://localhost:3000",
    "credentials": true,
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "allowedHeaders": ["Content-Type", "Authorization"],
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  })
  await app.listen(4000);
}
bootstrap();
