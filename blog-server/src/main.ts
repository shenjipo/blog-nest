import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { controllGobalPrefix } from './app.environment';

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.setGlobalPrefix(controllGobalPrefix)
    app.enableCors({
        origin: true, // 允许所有来源
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // 允许的HTTP方法
        allowedHeaders: 'Content-Type, Accept, Authorization', // 允许的请求头
        credentials: true, // 允许携带凭证（如cookies）
    });
    await app.listen(process.env.APP_PORT)
    console.log(`server is running at http://localhost:${process.env.APP_PORT}`)
}
bootstrap();
