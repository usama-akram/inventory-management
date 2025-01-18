import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';

@Catch()
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    console.log({exception})
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;;
    let message = 'Internal Server Error'
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (exception && exception.hasOwnProperty('response') && exception?.response.hasOwnProperty('message') && Array.isArray(exception.response.message)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      message = exception.response.message[0]
    }
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    else if (exception && exception.hasOwnProperty('response') && exception.response.hasOwnProperty('message')) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      message = exception.response.message
    }
    else if (exception && exception.hasOwnProperty('message') && exception.message.length > 0) {
      message = exception.message
    }
    else if (exception && exception.hasOwnProperty('message')) {
      message = exception.message
    }
    else {
      message = 'Internal Server Error'
    }
    response
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
      .status(status)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .json({
        success: false,
        statusCode: status,
        message
      });
  }
}