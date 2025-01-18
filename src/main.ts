import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseTransformerInterceptor } from './globals/response.interceptor';
import { HttpExceptionFilter } from './globals/http-exception.filter';
import { ValidationPipe } from '@nestjs/common';

const PORT: number = Number(process.env.PORT) || 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('api'); // Optional: Set a global prefix

  // validation pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  // use global interceptor for changing response format
  app.useGlobalInterceptors(new ResponseTransformerInterceptor());
  // use global interceptor for changing error response format
  // app.useGlobalInterceptors(new ErrorTransformerInterceptor());
  // use global http exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
  });
}
bootstrap();
