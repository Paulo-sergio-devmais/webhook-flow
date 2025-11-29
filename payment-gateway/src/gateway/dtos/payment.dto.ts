export class PaymentDTO {
  payment: {
    transactionId: string;
    amount: number;
    paymentMethod: string;
    boletoNumber: string;
    status: string;
  };
  callbackUrl: string;
}
