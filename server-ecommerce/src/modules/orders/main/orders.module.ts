import { Module } from '@nestjs/common';
import { CreateOrderController } from '../presentation/controllers/create-order.controller';
import { CreateOrderUseCase } from '../application/usecases/create-order.usecase';
import { makeOrdersRepositoriesProviders } from '../application/providers/orders.providers';
import { OrdersRepository } from '../infra/repository/orders.repository';
import { PaymentModule } from 'src/modules/payments/main/paymnet.module';
import { WebhookReturnController } from '../presentation/controllers/webhook-return.controller';

@Module({
  imports: [PaymentModule],
  controllers: [CreateOrderController, WebhookReturnController],
  providers: [
    CreateOrderUseCase,
    OrdersRepository,
    ...makeOrdersRepositoriesProviders(),
  ],
})
export class OrdersModule {}
