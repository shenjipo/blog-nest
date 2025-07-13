import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationDto } from 'src/database/pagination.dto';
import { Brackets } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { UserDto } from '../dtos/user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UserRepository {

    constructor(
        @InjectRepository(UserEntity)
        private readonly repository: Repository<UserEntity>,
    ) {

    }

    getPasswordByAccount(account: string) {
        return this.repository.findOne({
            where: { account: account }
        })
    }

    getAccountByUuid(uuid: string) {
        return this.repository.findOne({ where: [{ uuid: uuid }] })
    }

    async editAccount(val: { uuid: string, password: string, updateTime: string }) {
        const findAccount = await this.repository.findOneBy({ uuid: val.uuid })
        if (!findAccount) {
            throw new NotFoundException('Blog not found')
        }


        findAccount.password = val.password
        findAccount.updateTime = val.updateTime
        return this.repository.save(findAccount)
    }

    async deleteAccount(uuid: string) {
        return this.repository.delete({ uuid: uuid })
    }

    async addAccount(val: { account: string, password: string, createTime: string }) {
        const account = new UserDto()
        account.uuid = uuidv4()
        account.account = val.account
        account.password = val.password
        account.createTime = val.password
        return this.repository.save(account)
    }

    async getUserList(page: PaginationDto<{ query: string }>) {

        const queryBuilder = this.repository.createQueryBuilder()
        // 添加模糊查询条件

        queryBuilder.where(new Brackets(qb => {
            if (page.query) {
                qb.andWhere('account LIKE :account', { title: `%${page.query}%` })
            }
        }))

        queryBuilder.orderBy('CAST(createTime AS SIGNED)', 'DESC')
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