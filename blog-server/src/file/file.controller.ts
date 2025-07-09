import {
    Controller,
    Post,
    UploadedFile,
    Get,
    Param,
    Res,
    StreamableFile,
    UseInterceptors,
} from '@nestjs/common';
import { createReadStream } from 'fs';
import { UploadService } from './file.service';
import { PublicApi } from 'src/auth/decorators/publick.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@PublicApi()
@Controller()
export class UploadController {
    constructor(private readonly uploadService: UploadService) { }

    @Post('uploadImg')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        console.log(file, 'file')
        return this.uploadService.uploadFile(file);
    }

    @Get('getImage/:fileName')
    getFile(@Param('fileName') fileName: string, @Res() res: Response) {
        const file = this.uploadService.getFile(fileName)
        res.set({
            'Content-Type': file.mimetype,
        })
        return res.sendFile(file.filePath)
    }
}