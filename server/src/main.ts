import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // If set to true validator will strip validated object of any properties that do not have any decorators.
    forbidNonWhitelisted: true, // If set to true, instead of stripping non-whitelisted properties validator will throw an error/
    transform: true, // url내 파라미터값들을 컨트롤러에 선언된 타입으로 자동으로 타입을 변환시켜준다.
  }))
  await app.listen(3000);
}
bootstrap();
