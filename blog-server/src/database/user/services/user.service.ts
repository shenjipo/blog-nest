import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { PaginationDto } from 'src/database/pagination.dto';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepo: UserRepository,
    ) {

    }

    async getUserList(val: PaginationDto<{ query: string }>) {
        return this.userRepo.getUserList(val)
    }

    async getAccountByUuid(uuid: string) {
        return this.userRepo.getAccountByUuid(uuid)
    }

    async addAccount(val: { account: string, password: string, createTime: string }) {
        return this.userRepo.addAccount(val)
    }

    async editAccount(val: { uuid: string, password: string, updateTime: string }) {
        return this.userRepo.editAccount(val)
    }

    async deleteAccount(uuid: string) {
        return this.userRepo.deleteAccount(uuid)
    }

    async verifyUser(user: { account: string, password: string }) {
        const findUser = await this.userRepo.getPasswordByAccount(user.account)
        if (!findUser) {
            return null
        }
        if (findUser.password === user.password) {
            return findUser
        }
        return null
    }
}