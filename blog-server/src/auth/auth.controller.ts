// auth/auth.controller.ts
import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { PublicApi } from './decorators/publick.decorator';

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    @PublicApi()
    async login(@Body() user: { account: string, password: string }) {
        return this.authService.login(user)
    }

    @UseGuards(AuthGuard('jwt')) // 使用 JWT 守卫保护路由
    @Post('profile')
    getProfile(@Request() req) {
        return req.user; // 从 JwtStrategy.validate 返回的用户信息
    }
}