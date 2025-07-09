import { Body, Controller, Post, UploadedFile, } from '@nestjs/common';
import { BlogService } from './blog.service';
import { PaginationDto } from '../pagination.dto';
import { Blog } from './blog.dto';


@Controller()
export class BlogController {
    constructor(private readonly blogService: BlogService) { }
    @Post('saveBlog')
    saveBlog(@Body() blog: Blog & { uuid: string }) {
        return this.blogService.saveBlog(blog)
    }

    @Post('queryBlogList')
    queryBlogList(@Body() paginationDto: PaginationDto<{ query: string, uuid: string }>) {
        return this.blogService.getBlogList(paginationDto)
    }

    @Post('queryBlogById')
    queryBlogById(@Body() val: { id: string }) {
        return this.blogService.getBlogById(val.id)
    }

    @Post('updateBlogById')
    updateBlogById(@Body() blog: Blog) {
        return this.blogService.updateBlogById(blog)
    }

    @Post('UpdateBlogShowById')
    UpdateBlogShowById(@Body() val: { id: string, updateTime: string, isPreviewShow: string }) {
        return this.blogService.UpdateBlogShowById(val)
    }

    @Post('deleteBlogById')
    deleteBlogById(@Body() val: { id: string }) {
        return this.blogService.deleteBlogById(val.id)
    }
}