// auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/database/user/services/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService,
        private readonly userService: UserService
    ) { }

    async login(user: { account: string; password: string }) {
        const payload = { username: user.account }
        const loginUser = await this.userService.verifyUser(user)
        if (loginUser) {
            return {
                token: await this.jwtService.signAsync(payload),
                user: loginUser,
            }
        } else {
            throw new UnauthorizedException()
        }

    }

}