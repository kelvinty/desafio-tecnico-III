// src/main.ts

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IdempotencyInterceptor } from './common/interceptors/idempotency.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   // Aplica o interceptor global
  app.useGlobalInterceptors(new IdempotencyInterceptor());
  // Ativa a validação global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,        // Remove propriedades não definidas nos DTOs
      forbidNonWhitelisted: true, // Retorna erro se enviar propriedades extras
      transform: true,        // Transforma payload em instâncias dos DTOs
    }),
  );

  app.enableCors({
    origin: 'http://localhost:4200', // URL do seu frontend Angular
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true
  });

  await app.listen(3000);
}
bootstrap();
