import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

export function setupSwagger(app: INestApplication) {
    const options = new DocumentBuilder()
        .setTitle('Platform Chemy API')
        .setDescription('some description')
        .setVersion('1.0')
        .addTag('chemy') // Добавьте теги, если необходимо
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('doc', app, document);
}
