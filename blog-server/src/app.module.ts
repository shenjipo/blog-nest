import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseConfigService } from './database/database.config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { resolve } from 'path';
import { DatabaseModule } from './database/database.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HttpRequestInterceptor } from './interceptor/http.request.interceptor';
import { HttpResponseInterceptor } from './interceptor/http.response.interceptor';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [resolve(__dirname, '../.env.defaults')],
            isGlobal: true,
            expandVariables: true,
        }),
        TypeOrmModule.forRootAsync({
            useClass: DatabaseConfigService
        }),
        DatabaseModule,
        AuthModule,
        FileModule,
    ],
    controllers: [AppController],
    providers: [

        { provide: APP_INTERCEPTOR, useClass: HttpResponseInterceptor },
        { provide: APP_INTERCEPTOR, useClass: HttpRequestInterceptor },
        AppService,
    ],
})
export class AppModule { }
