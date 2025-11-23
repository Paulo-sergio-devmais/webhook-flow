import { Provider } from '@nestjs/common';
import { OrdersRepository } from '../../infra/repository/orders.repository';

export const makeOrdersRepositoriesProviders = (): Provider[] => [
  {
    provide: 'CREATE_ORDER_REPOSITORY',
    useClass: OrdersRepository,
  },
];
