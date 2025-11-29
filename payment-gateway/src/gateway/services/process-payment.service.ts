import { Injectable } from '@nestjs/common';
import { PaymentRepository } from './payment-repository';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class ProcessPaymentService {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  @Cron('*/5 * * * * *')
  async process() {
    const payments = this.paymentRepository.loadPayments();
    console.log('Loaded payments:', payments, '\n');

    return new Promise((resolve) =>
      resolve({
        transactionId: 'trx_1234567890',
        status: 'approved',
      }),
    );
  }
}
