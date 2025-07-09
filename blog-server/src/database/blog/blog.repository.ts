import { Brackets, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogEntity } from './blog.entity';
import { PageList, PaginationDto } from '../pagination.dto';

@Injectable()
export class BlogRepository {

    constructor(
        @InjectRepository(BlogEntity)
        private readonly repository: Repository<BlogEntity>,
    ) {

    }
    
    async getAllBlogList() {
        return this.repository.find({
            select: ['author', 'authorUuid', 'createTime', 'id', 'isPreviewShow', 'title', 'updateTime']
        })
    }

    async getBlogById(blogId: string) {
        return this.repository.findOne({
            where: { id: blogId }
        })
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