import { Injectable } from '@nestjs/common';

@Injectable()
export class OrdersRepository {
  async create(order: any): Promise<any> {
    return new Promise((resolve) =>
      resolve({
        id: 'order-id-123',
        ...order,
      }),
    );
  }
}
