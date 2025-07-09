// src/upload/upload.module.ts
import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogEntity } from './blog.entity';
import { BlogRepository } from './blog.repository';
import { BlogNoTokenController } from './blog.notoken.controller';

@Module({
    imports: [
        TypeOrmModule.forFeature([BlogEntity])
    ],
    controllers: [BlogController, BlogNoTokenController],
    providers: [BlogService, BlogRepository],
})
export class BlogModule { }