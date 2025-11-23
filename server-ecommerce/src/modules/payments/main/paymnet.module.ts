import { Module } from '@nestjs/common';
import { makePaymentProviders } from '../application/providers/payment.provider';
import { PaymentService } from '../application/services/payment.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [],
  providers: [PaymentService, ...makePaymentProviders()],
  exports: ['PROCESS_PAYMENT'],
})
export class PaymentModule {}
