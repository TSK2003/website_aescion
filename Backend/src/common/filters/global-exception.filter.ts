import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { ApiResponse } from '../interfaces/api-response.interface';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const requestId = request.headers['x-request-id'] || randomUUID();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errors = null;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse: any = exception.getResponse();

      message =
        typeof exceptionResponse === 'string'
          ? exceptionResponse
          : exceptionResponse.message || message;

      errors =
        typeof exceptionResponse === 'object' ? exceptionResponse.error : null;
    }
    // Handle Prisma specific errors here in a real production app without exposing raw details

    const errorResponse: ApiResponse<null> = {
      success: false,
      message,
      errors,
      timestamp: new Date().toISOString(),
      requestId: requestId as string,
    };

    // Log the error centrally here
    console.error(`[${requestId}] Error:`, exception);

    response.status(status).json(errorResponse);
  }
}
