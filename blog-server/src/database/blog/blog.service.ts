// src/upload/upload.service.ts
import { Injectable } from '@nestjs/common';
import { BlogRepository } from './blog.repository';
import { PaginationDto } from '../pagination.dto';

@Injectable()
export class BlogService {


    constructor(private readonly blogRepo: BlogRepository,) {

    }

    async getBlogList(val: PaginationDto<{ query: string, uuid: string }>) {
        const res = await this.blogRepo.getBlogList(val)
        return res
    }

    async getBlogById(blogId: string) {
        const res = await this.blogRepo.getBlogById(blogId)
        return res
    }

    async getAllBlogList() {
        const res = await this.blogRepo.getAllBlogList()
        return res
    }
}