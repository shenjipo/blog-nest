import { Body, Controller, Post, UploadedFile, } from '@nestjs/common';
import { BlogService } from './blog.service';
import { PaginationDto } from '../pagination.dto';
import { PublicApi } from 'src/auth/decorators/publick.decorator';

@PublicApi()
@Controller()
export class BlogNoTokenController {
    constructor(private readonly blogService: BlogService) { }

    @Post('queryBlogListExceptContent')
    queryBlogList() {
        return this.blogService.getAllBlogList()
    }

    @Post('queryBlogByIdNoToken')
    queryBlogById(@Body() val: { id: string }) {
        return this.blogService.getBlogById(val.id)
    }
}