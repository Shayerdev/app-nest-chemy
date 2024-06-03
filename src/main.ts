import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';

(async () => {
    // Create Factory Nest App
    const app = await NestFactory.create(AppModule);
    // Setup Swagger
    app.setGlobalPrefix('api');
    setupSwagger(app);
    // Open port for Nest App
    await app.listen(3001);
})();
