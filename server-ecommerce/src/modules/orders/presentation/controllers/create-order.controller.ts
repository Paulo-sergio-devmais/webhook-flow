import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateOrderDto } from '../../domain/models/create-order.dto';
import { ServerErrorException } from '../http-exceptions/server-error';
import { CreateOrderUseCase } from '../../application/usecases/create-order.usecase';
import { OrderFailedValidation } from '../../application/errors/new-order-failed-validation';
import { BadRequestException } from '../http-exceptions/bad-request';

@Controller('orders')
export class CreateOrderController {
  constructor(private readonly createOrderUseCase: CreateOrderUseCase) {}

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async handle(@Body() request: Partial<CreateOrderDto>): Promise<any> {
    try {
      const result = await this.createOrderUseCase.execute(
        request as CreateOrderDto,
      );

      return {
        message: 'Order created successfully',
        result,
      };
    } catch (error) {
      if (error instanceof OrderFailedValidation) {
        return BadRequestException.create(error.message);
      }

      const errorMessage = error instanceof Error ? error.message : '';
      return ServerErrorException.create(errorMessage);
    }
  }
}
