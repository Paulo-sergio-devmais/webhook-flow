export namespace PaymentModal {
  export type PaymentMethods = 'CREDIT_CARD' | 'PIX' | 'BOLETO';

  export interface Process {
    orderId: string;
    amount: number;
    method: string;
  }

  export interface PaymentData {
    transactionId: string;
    amount: number;
    paymentMethod: PaymentMethods;
    creditCard?: {
      cardToken: string;
      paymentSessionId: string;
    };
    pix?: {
      qrCode: string;
    };
    boleto?: {
      boletoNumber: string;
    };
  }
}
