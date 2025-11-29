import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SavePaymentService } from './services/save-payment.service';
import { PaymentDTO } from './dtos/payment.dto';

@Controller('payments')
export class GatewayController {
  constructor(private readonly savePaymentService: SavePaymentService) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  async handle(@Body() request: PaymentDTO): Promise<boolean> {
    try {
      const result = await this.savePaymentService.savePayment(request);
      return result;
    } catch (error) {
      console.error('Error handling payment:', error);
      return false;
    }
  }
}
