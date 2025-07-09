// auth/auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/database/user/user.module';
import { jwtSecert } from 'src/app.environment';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

@Module({
    imports: [
        JwtModule.register({
            secret: jwtSecert, // 建议从环境变量读取
            signOptions: { expiresIn: '1h' }, // Token 过期时间
        }),
        UserModule
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, {
        provide: APP_GUARD,
        useClass: AuthGuard,
    },],
    exports: [AuthService],
})
export class AuthModule { }