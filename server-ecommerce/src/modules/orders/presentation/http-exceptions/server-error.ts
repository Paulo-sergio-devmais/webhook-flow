import { HttpException, HttpStatus } from '@nestjs/common';

export class ServerErrorException extends HttpException {
  private constructor(message?: string) {
    super(
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error: message || 'Internal Server Error',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }

  static create(message?: string): ServerErrorException {
    return new ServerErrorException(
      message,
    ).getResponse() as ServerErrorException;
  }
}
