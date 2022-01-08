import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    console.log(exception);

    const message = exception instanceof HttpException ? exception.message : '';
    const error =
      exception instanceof HttpException ? exception.getResponse() : null;
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      message: message || '',
      error: {
        status: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        error,
      },
    });
  }
}
