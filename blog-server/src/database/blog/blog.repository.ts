import { Brackets, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogEntity } from './blog.entity';
import { PageList, PaginationDto } from '../pagination.dto';
import { Blog } from './blog.dto';
import { NotFoundException } from '@nestjs/common';
import { Utils } from 'src/Utils/Utils';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BlogRepository {

    constructor(
        @InjectRepository(BlogEntity)
        private readonly repository: Repository<BlogEntity>,
    ) {

    }

    async getAllBlogList() {
        return this.repository.find({
            select: ['author', 'author_uuid', 'createTime', 'id', 'isPreviewShow', 'title', 'updateTime']
        })
    }

    async getBlogById(blogId: string) {
        return this.repository.findOne({
            where: { id: blogId }
        })
    }

    async saveBlog(blog: Blog & { uuid?: string }) {
        blog.id = uuidv4()
        blog.author_uuid = blog.uuid!
        delete blog.uuid
        return this.repository.save(blog)
    }

    async deleteBlogById(blogId: string) {
        return this.repository.delete({ id: blogId })
    }

    async UpdateBlogShowById(val: { id: string, updateTime: string, isPreviewShow: string }) {
        const findBlog = await this.repository.findOneBy({ id: val.id })
        if (!findBlog) {
            throw new NotFoundException('Blog not found')
        }
        findBlog.isPreviewShow = val.isPreviewShow
        findBlog.updateTime = val.updateTime
        return this.repository.save(findBlog)
    }

    async updateBlogById(blog: Blog) {
        const findBlog = await this.repository.findOneBy({ id: blog.id })
        if (!findBlog) {
            throw new NotFoundException('Blog not found')
        }

        if (Utils.IsNotNull(blog.title)) {
            findBlog.title = blog.title;
        }

        if (Utils.IsNotNull(blog.content)) {
            findBlog.content = blog.content;
        }

        if (Utils.IsNotNull(blog.isPreviewShow)) {
            findBlog.isPreviewShow = blog.isPreviewShow;
        }
        if (Utils.IsNotNull(blog.updateTime)) {
            findBlog.updateTime = blog.updateTime;
        }
        return this.repository.save(blog)
    }

    async getBlogList(page: PaginationDto<{ query: string, uuid: string }>): Promise<PageList<BlogEntity>> {
        const queryBuilder = this.repository.createQueryBuilder()
        // 添加模糊查询条件

        queryBuilder.where(new Brackets(qb => {
            qb.andWhere('author_uuid = :uuid', { uuid: page.uuid })
            if (page.query) {
                qb.andWhere('title LIKE :title', { title: `%${page.query}%` })
            }
        }))


        const skip = (page.current - 1) * page.size

        const [data, total] = await queryBuilder.skip(skip).take(page.size).getManyAndCount()

        return {
            total: total,
            current: page.current,
            size: page.size,
            data,
        }
    }

}