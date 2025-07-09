import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { jwtSecert } from 'src/app.environment';
import { IS_PUBLIC_API } from './decorators/publick.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
    ) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_API, [
            context.getHandler(),
            context.getClass(),
        ])
        if (isPublic) {
            return true
        }

        const request = context.switchToHttp().getRequest()
        const token = this.extractTokenFromHeader(request)
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: jwtSecert,
            })
           
            request['user'] = payload
        } catch {
            throw new UnauthorizedException()
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const token = (request.headers as any).authorization
        return token
    }
}