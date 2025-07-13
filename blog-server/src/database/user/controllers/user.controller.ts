import { Body, Controller, Delete, Get, Headers, HttpStatus, Param, Post, Query, UseInterceptors } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { PaginationDto } from 'src/database/pagination.dto';

@Controller()
export class UserController {
    constructor(
        private readonly userService: UserService,
    ) {

    }

    @Post('queryAccount')
    async queryAccount(@Body() paginationDto: PaginationDto<{ query: string }>) {
        return this.userService.getUserList(paginationDto)
    }

    @Get('getAccountByUuid')
    async getAccountByUuid(@Query() query: { uuid: string }) {
        return this.userService.getAccountByUuid(query.uuid)
    }


    @Post('addAccount')
    async addAccount(@Body() body: { account: string, password: string, createTime: string }) {
        return this.userService.addAccount(body)
    }

    @Post('deleteAccount')
    async deleteAccount(@Body() body: { uuid: string }) {
        return this.userService.deleteAccount(body.uuid)
    }

    @Post('editAccount')
    async editAccount(@Body() body: { uuid: string, password: string, updateTime: string }) {
        return this.userService.editAccount(body)
    }
}