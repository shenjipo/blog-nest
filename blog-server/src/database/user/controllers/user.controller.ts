import { Body, Controller, Delete, Get, Headers, HttpStatus, Param, Post, Query, UseInterceptors } from '@nestjs/common';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {

    }

    @Get('userList')
    async getUserList(): Promise<any> {
        return this.userService.getUserList()
    }
}