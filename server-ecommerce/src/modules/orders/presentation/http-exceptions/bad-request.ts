import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestException extends HttpException {
  private constructor(message?: string) {
    super(
      {
        status: HttpStatus.BAD_REQUEST,
        error: message || 'Bad Request',
      },
      HttpStatus.BAD_REQUEST,
    );
  }

  static create(message?: string): BadRequestException {
    return new BadRequestException(
      message,
    ).getResponse() as BadRequestException;
  }
}
