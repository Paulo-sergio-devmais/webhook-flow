import { Provider } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PaymentService } from '../services/payment.service';

export const makePaymentProviders = (): Provider[] => [
  {
    provide: 'PROCESS_PAYMENT',
    useFactory: (httpService: HttpService) => {
      return new PaymentService(httpService);
    },
    inject: [HttpService],
  },
];
