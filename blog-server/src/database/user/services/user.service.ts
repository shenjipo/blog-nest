import { Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UserService {
    constructor(
        private readonly userRepo: UserRepository,
    ) {

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

    async getUserList() {
        const a = await this.userRepo.getUserList()

        return a
    }
}