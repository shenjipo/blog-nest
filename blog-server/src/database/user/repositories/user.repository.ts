import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

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

    getUserList(): Promise<Array<UserEntity>> {

        return this.repository.find({
            select: ['uuid', 'account', 'password', 'createTime', 'updateTime'],
            where: [],
        })
    }

}