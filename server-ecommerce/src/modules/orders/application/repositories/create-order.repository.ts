import { OrderRepoModel } from '../models/order-repo';

export interface CreateOrderRepository {
  create(order: OrderRepoModel.Order): Promise<OrderRepoModel.Response>;
}

// criar abstraçao da entidade Order
