import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { tap } from 'rxjs/operators';
  import { LogService } from './log.service';
  
  @Injectable()
  export class LoggingInterceptor implements NestInterceptor {
    constructor(private readonly logService: LogService) {}
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const request = context.switchToHttp().getRequest();
      const method = request.method;
      const url = request.url;
      const requestBody = request.body;
  
      return next.handle().pipe(
        tap(async (responseBody) => {
          const statusCode = context.switchToHttp().getResponse().statusCode;
          const user = request.user ? request.user.id : 'Anonymous'; 
  
          // Log the request and response
          await this.logService.createLog({
            method,
            url,
            statusCode,
            requestBody,
            responseBody,
            user,
          });
        }),
      );
    }
  }
  