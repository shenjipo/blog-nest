import { Body, Controller, Post, UploadedFile, } from '@nestjs/common';
import { BlogService } from './blog.service';
import { PaginationDto } from '../pagination.dto';
import { PublicApi } from 'src/auth/decorators/publick.decorator';

@Controller()
export class BlogController {
    constructor(private readonly blogService: BlogService) { }

    @Post('queryBlogList')
    queryBlogList(@Body() paginationDto: PaginationDto<{ query: string, uuid: string }>) {
        return this.blogService.getBlogList(paginationDto)
    }

    @Post('queryBlogById')
    queryBlogById(@Body() val: { id: string }) {
        return this.blogService.getBlogById(val.id)
    }
}