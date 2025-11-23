import { Provider } from '@nestjs/common';
import { PaymentService } from '../services/payment.service';

export const makePaymentProviders = (): Provider[] => [
  {
    provide: 'PROCESS_PAYMENT',
    useClass: PaymentService,
  },
];
