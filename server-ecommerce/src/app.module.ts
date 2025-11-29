import { Module } from '@nestjs/common';
import { OrdersModule } from './modules/orders/main/orders.module';

@Module({
  imports: [OrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
