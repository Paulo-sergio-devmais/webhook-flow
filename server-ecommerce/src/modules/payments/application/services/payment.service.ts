import { HttpService } from '@nestjs/axios';
import { PaymentModal } from '../../domain/model/payment';
import { ProcessPayment } from '../../domain/protocols/process-payment';

export class PaymentService implements ProcessPayment {
  constructor(private readonly httpService: HttpService) {}

  async process(params: PaymentModal.Process): Promise<boolean> {
    try {
      const mappedPayment = this.map(params);
      const payload = {
        payment: mappedPayment,
        callbackUrl: 'http://localhost:3000/payments/webhook',
      };
      const response = await this.httpService
        .post('http://localhost:3001/payments/register', payload)
        .toPromise();

      return response?.data.status === '200';
    } catch (error) {
      console.error('Payment processing failed:', error);
      return false;
    }
  }

  private mapPaymentMethods(method: string): string {
    const methodsmap: { [key: string]: string } = {
      credit_card: 'CC',
      pix: 'PIX',
      boleto: 'BOLETO',
    };
    return methodsmap[method] || method;
  }

  private generatePaymentId(): string {
    return Math.random().toString(36).substring(2, 15);
  }

  private map(data: PaymentModal.Process): any {
    const mappedPaymentData: PaymentModal.PaymentData = {
      transactionId: this.generatePaymentId(),
      amount: data.amount,
      paymentMethod: this.mapPaymentMethods(
        data.method,
      ) as PaymentModal.PaymentMethods,
      ...this.checkPaymentMethod(
        data.method as PaymentModal.PaymentMethods,
        data.orderId,
      ),
    };

    return mappedPaymentData;
  }

  private checkPaymentMethod(
    method: PaymentModal.PaymentMethods,
    orderId: string,
  ) {
    // aqui pode ser uma estrategia
    if (method === ('credit_card' as PaymentModal.PaymentMethods)) {
      return {
        cardToken: 'fake_card_token_' + orderId,
        paymentSessionId: 'ps_' + Math.random().toString(36).slice(2),
        status: 'pending',
      };
    }

    if (method === ('pix' as PaymentModal.PaymentMethods)) {
      return {
        qrCode: 'fake_qr_code_' + orderId,
        status: 'pending',
      };
    }

    if (method === ('boleto' as PaymentModal.PaymentMethods)) {
      return {
        boletoNumber: '23793.38128 60001.000136 04000.123400 1 98760000015000',
        status: 'pending',
      };
    }
  }
}
