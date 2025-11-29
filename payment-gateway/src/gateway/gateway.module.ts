import { Module } from '@nestjs/common';
import { SavePaymentService } from './services/save-payment.service';
import { ScheduleModule } from '@nestjs/schedule';
import { PaymentRepository } from './services/payment-repository';
import { ProcessPaymentService } from './services/process-payment.service';
import { GatewayController } from './gateway.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, ScheduleModule.forRoot()],
  controllers: [GatewayController],
  providers: [SavePaymentService, PaymentRepository, ProcessPaymentService],
})
export class GatewayModule {}
