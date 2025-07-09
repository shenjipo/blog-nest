// src/upload/upload.module.ts
import { Module } from '@nestjs/common';
import { UploadController } from './file.controller';
import { UploadService } from './file.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';

@Module({
    imports: [
        MulterModule.register({
            storage: diskStorage({
                destination: (req, file, cb) => {
                    const uploadDir = join(__dirname, '..', '..', 'assets', 'upload', 'img');
                    cb(null, uploadDir);
                },
                filename: (req, file, cb) => {
                    const randomName = Array(32).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
                    return cb(null, `${randomName}${file.originalname.slice(file.originalname.lastIndexOf('.'))}`)
                },
            }),
            fileFilter: (req, file, cb) => {
                // 限制只允许上传图片文件
                if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
                    return cb(new Error('只允许上传图片文件 (JPG, JPEG, PNG, GIF, WEBP)'), false);
                }
                cb(null, true);
            },
            limits: {
                fileSize: 1024 * 1024 * 5, // 限制5MB
            },
        }),
    ],
    controllers: [UploadController],
    providers: [UploadService],
})
export class FileModule { }