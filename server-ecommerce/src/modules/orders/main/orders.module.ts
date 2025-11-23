import { Module } from '@nestjs/common';
import { CreateOrderController } from '../presentation/controllers/create-order.controller';
import { CreateOrderUseCase } from '../application/usecases/create-order.usecase';
import { makeOrdersRepositoriesProviders } from '../application/providers/orders.providers';
import { OrdersRepository } from '../infra/repository/orders.repository';
import { PaymentModule } from 'src/modules/payments/main/paymnet.module';

@Module({
  imports: [PaymentModule],
  controllers: [CreateOrderController],
  providers: [
    CreateOrderUseCase,
    OrdersRepository,
    ...makeOrdersRepositoriesProviders(),
  ],
})
export class OrdersModule {}
