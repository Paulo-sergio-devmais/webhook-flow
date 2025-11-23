import { PaymentModal } from '../model/payment';

export interface ProcessPayment {
  process(params: PaymentModal.Process): Promise<boolean>;
}
