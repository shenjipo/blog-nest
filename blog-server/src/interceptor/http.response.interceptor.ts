import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

interface Response<T = any> {
    data: T;
    code: number;
    message: string;
}

@Injectable()
export class HttpResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response> {
        return next.handle().pipe(map(data => {
            return {
                data,
                code: HttpStatus.OK,
                message: 'success',
            }
        }))
    }
}