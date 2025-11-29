import { Injectable } from '@nestjs/common';
import { PaymentRepository } from './payment-repository';
import { Cron } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios/dist/http.service';

@Injectable()
export class ProcessPaymentService {
  private WEBHOOK_URL: string;

  constructor(
    private readonly paymentRepository: PaymentRepository,
    private readonly httpService: HttpService,
  ) {}

  /**
   * Essa Cron simula o processamento de pagamentos
   * pendentes a cada 30 segundos.
   */
  @Cron('*/30 * * * * *')
  async process() {
    const allPayments = this.paymentRepository.loadPayments();
    const pendingPayments = allPayments.filter((data) => {
      const { payment } = data;
      return payment.status === 'pending';
    });

    if (pendingPayments.length === 0) {
      console.log('No pending payments to process');
      return new Promise((resolve) => resolve(true));
    }

    for (const paymentData of pendingPayments) {
      try {
        const { callbackUrl, payment } = paymentData;
        this.WEBHOOK_URL = callbackUrl;

        payment.status = 'approved';

        await this.httpService.post(this.WEBHOOK_URL, payment).toPromise();
      } catch (error) {
        throw new Error('Error processing payment: ' + error);
      }
    }

    await this.paymentRepository.update(allPayments);
    console.log('Processed payments:', pendingPayments);
    return new Promise((resolve) => resolve(true));
  }
}
