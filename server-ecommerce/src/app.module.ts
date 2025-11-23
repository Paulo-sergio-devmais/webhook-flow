import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/main/users.module';
import { OrdersModule } from './modules/orders/main/orders.module';

@Module({
  imports: [UsersModule, OrdersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
