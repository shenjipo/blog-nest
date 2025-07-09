// auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 从 Authorization 头提取 Token
            ignoreExpiration: false, // 是否忽略过期时间
            secretOrKey: process.env.JWT_SALT, // 必须与 JwtModule.register 中的密钥一致
        });
    }

    // 验证成功后的回调，payload 是解码后的 JWT 数据
    async validate(payload: any) {
        return { userId: payload.sub, username: payload.username }; // 返回的用户信息会附加到 request.user
    }
}