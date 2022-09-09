import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import { AppModule } from './app.module';
import { isDeployed } from './utils/environment.utils';

const port = process.env.PORT || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      // Disable errors messages in production environment
      disableErrorMessages: isDeployed(),
      // Strict processing (unknown properties will result into a bad request exception)
      whitelist: true,
      // Unknown properties from requests payload will result in bad request errors
      forbidNonWhitelisted: true,
      // Transform plain objects to DTO classes
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        return new BadRequestException(errors);
      },
    }),
  );

  await app.listen(port);
}
bootstrap();
