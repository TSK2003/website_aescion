import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponse } from '../interfaces/api-response.interface';
import { randomUUID } from 'crypto';

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
  T,
  ApiResponse<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ApiResponse<T>> {
    const request = context.switchToHttp().getRequest();

    // In a real app, requestId might come from middleware/headers.
    const requestId = request.headers['x-request-id'] || randomUUID();

    return next.handle().pipe(
      map((data) => {
        // If data is already in the standardized format, return it
        if (
          data &&
          typeof data === 'object' &&
          'success' in data &&
          'timestamp' in data
        ) {
          return data;
        }

        return {
          success: true,
          message: 'Success',
          data,
          timestamp: new Date().toISOString(),
          requestId,
        };
      }),
    );
  }
}
