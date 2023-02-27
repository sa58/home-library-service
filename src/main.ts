import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingService } from './logging/loging.service';
import { ValidationPipe } from './validation.pipe';

async function bootstrap() {
  const PORT = process.env.PORT || 4000;

  const app = await NestFactory.create(AppModule, {
    logger: new LoggingService()
  });

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT);
}
bootstrap();
