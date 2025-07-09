import { Body, Controller, Delete, Get, Headers, HttpStatus, Param, Post, Query, UseInterceptors } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller()
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {

    }

    @Post('queryAccount')
    async queryAccount() {
        return this.userService.queryAccount()
    }
    @Post('addAccount')
    async addAccount(@Body() account: { username: string, password: string, createTime: string }) {
        return this.userService.queryAccount()
    }

    @Post('deleteAccount')
    async deleteAccount(@Body() val: { uuid: string }) {
        return this.userService.queryAccount()
    }

    @Post('editAccount')
    async editAccount(@Body() val: { uuid: string, password: string, updateTime: string }) {
        return this.userService.queryAccount()
    }
}