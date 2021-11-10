import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const [ customcode, message ] = exception.message.split('@@')

    response.status(status).json({
      code: Number(customcode) || exception.getStatus(),
      message: message,
      data: null
    });
  }
}
