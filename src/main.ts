import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  const config = new DocumentBuilder()
    .setTitle('Система Мониторинга Мидийной Фермы')
    .setDescription('Документация REST API для автоматизации процессов выращивания моллюсков и сбора телеметрии')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.enableCors();

  await app.listen(3000);
  console.log(`🚀 Сервер запущен на: http://localhost:3000/api`);
  console.log(`📖 Документация Swagger доступна на: http://localhost:3000/api/docs`);
}
bootstrap();
