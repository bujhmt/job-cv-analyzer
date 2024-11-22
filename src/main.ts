import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const config = new DocumentBuilder()
        .setTitle('Job-CV Analyzer')
        .setDescription('API for analyzing job descriptions against CVs')
        .setVersion('1.0')
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    app.enableCors();

    const port = process.env.PORT ?? 3000;
    await app.listen(port);

    Logger.log(`Server is running on port ${port}. Check http://localhost:${port}/api for API docs.`);
}

bootstrap();
