import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class HttpRequestInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const now = Date.now();

        console.log(`Request started at ${new Date().toISOString()}`);
        console.log(`Request URL: ${request.url}`);


        return next.handle().pipe(tap(() => {
            console.log(`Request processed in ${Date.now() - now}ms`)
        }))
    }
}