export interface CreateOrderRepository {
  create(order: any): Promise<any>;
}

// criar abstraçao da entidade Order
