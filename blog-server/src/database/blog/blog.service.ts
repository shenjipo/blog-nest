// src/upload/upload.service.ts
import { Injectable } from '@nestjs/common';
import { BlogRepository } from './blog.repository';
import { PaginationDto } from '../pagination.dto';
import { Blog } from './blog.dto';

@Injectable()
export class BlogService {


    constructor(private readonly blogRepo: BlogRepository,) {

    }
    async saveBlog(blog: Blog & { uuid: string }) {
        const res = await this.blogRepo.saveBlog(blog)
        return res
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

    async updateBlogById(blog: Blog) {
        const res = await this.blogRepo.updateBlogById(blog)
        return res
    }

    async UpdateBlogShowById(val: { id: string, updateTime: string, isPreviewShow: string }) {
        const res = await this.blogRepo.UpdateBlogShowById(val)
        return res
    }

    async deleteBlogById(blogId: string) {
        const res = await this.blogRepo.deleteBlogById(blogId)
        return res
    }
}