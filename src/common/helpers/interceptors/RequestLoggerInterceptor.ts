/* eslint-disable no-console */
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { InjectLogger } from 'src/common/helpers/logger/Logger.decorator';
import { LoggerService } from 'src/common/helpers/logger/Logger.service';

@Injectable()
export class RequestLoggerInterceptor implements NestInterceptor {
  constructor(
    @InjectLogger(RequestLoggerInterceptor.name) private logger: LoggerService,
  ) {}

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = process.hrtime();
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const contentTypeHeader = request.headers['content-type'];

    this.log('Request Method', request.method);
    this.log('Request Path', request.url);

    if (contentTypeHeader) {
      const contentType = contentTypeHeader.split(';')[0];
      this.log('Content Type', contentType);
    }

    this.log('Request Body', request.body);
    this.log('Request Query', request.query);
    this.log('Request Params', request.params);

    return next.handle().pipe(
      tap((res) => {
        const stop = process.hrtime(start);

        this.log('Response Body', res);
        this.log('Response Time in MS', (stop[0] * 1e9 + stop[1]) / 1e6);
      }),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private log(message: string, data: any): void {
    this.logger.verbose(`${message}  : ${JSON.stringify(data, undefined, 4)}`);
  }
}
