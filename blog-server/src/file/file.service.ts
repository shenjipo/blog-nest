// src/upload/upload.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { join } from 'path';
import * as fs from 'fs';
import { createReadStream } from 'fs';

@Injectable()
export class UploadService {
    private readonly uploadDir = join(__dirname, '..', '..', 'assets', 'upload', 'img')

    constructor() {
        // 确保上传目录存在
        this.ensureUploadDirExists();
    }

    uploadFile(file: Express.Multer.File) {
        // 这里可以添加额外的处理逻辑，如保存到数据库等
        return {
            originalname: file.originalname,
            url: file.filename,
            size: file.size,
            mimetype: file.mimetype,
            path: file.path,
        }
    }

    getFile(filename: string) {
        const filePath = join(this.uploadDir, filename);
        // 在实际应用中，你应该从数据库获取文件信息
        if (!fs.existsSync(filePath)) {
            throw new NotFoundException('图片不存在');
        }

        // 根据文件扩展名设置正确的 Content-Type
        const fileExtension = filename.split('.').pop()
        if (!fileExtension) {
            throw new NotFoundException('图片扩展名不存在!');
        }
        const contentType = this.getContentType(fileExtension);

        return {
            filePath: filePath,
            originalname: filename, // 这里应该从数据库获取原始文件名
            mimetype: contentType, // 这里应该从数据库获取MIME类型
        }
    }

    private getContentType(extension: string): string | null {
        const mimeTypes: Record<string, string> = {
            jpg: 'image/jpeg',
            jpeg: 'image/jpeg',
            png: 'image/png',
            gif: 'image/gif',
            webp: 'image/webp',
        };
        return mimeTypes[extension?.toLowerCase()] || null;
    }



    private ensureUploadDirExists() {
        if (!fs.existsSync(this.uploadDir)) {
            fs.mkdirSync(this.uploadDir, { recursive: true });
        }
    }
}