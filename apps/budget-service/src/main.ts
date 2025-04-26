import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enables CORS (in case other services or frontend need to call it)
  app.enableCors();

  // Applies class-validator to all incoming requests
  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,              // strips unknown properties
        forbidNonWhitelisted: true,   // throws error on unknown fields
        transform: true,              // transforms payloads to DTO classes
      }),
  );

  const port = process.env.PORT || 3002;
  await app.listen(port);
  console.log(`🚀 Transactions Service running on: http://localhost:${port}`);
}
bootstrap();
