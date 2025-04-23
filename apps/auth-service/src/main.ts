import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS (optional but useful for frontend and microservices)
  app.enableCors();

  // Global validation
  app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
  );

  // Read port from environment or fallback to 3001
  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`🚀 Auth Service running on: http://localhost:${port}`);
}
bootstrap();
