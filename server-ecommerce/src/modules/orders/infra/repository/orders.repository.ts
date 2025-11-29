import { Injectable } from '@nestjs/common';
import { CreateOrderRepository } from '../../application/repositories/create-order.repository';
import { join } from 'path';
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { OrderRepoModel } from '../../application/models/order-repo';

@Injectable()
export class OrdersRepository implements CreateOrderRepository {
  private readonly DB_FILE = join(
    process.cwd(),
    'src/modules/orders/infra/db/orders.json',
  );

  private getFilePath(): string {
    console.log('DB File Path:', this.DB_FILE);
    return this.DB_FILE;
  }

  loadOrders(): OrderRepoModel.Order[] {
    const filePath = this.getFilePath();
    if (!existsSync(filePath) || !readFileSync(filePath, 'utf-8')) {
      return [];
    }
    try {
      const data = readFileSync(filePath, 'utf-8');
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return JSON.parse(data);
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
      return [];
    }
  }

  saveOrders(orders: OrderRepoModel.Order[]) {
    try {
      const filePath = this.getFilePath();
      const dirPath = join(filePath, '..');
      // Cria o diretório se não existir
      if (!existsSync(dirPath)) {
        mkdirSync(dirPath, { recursive: true });
      }
      writeFileSync(filePath, JSON.stringify(orders, null, 2), 'utf-8');
    } catch (error) {
      console.error('Erro ao salvar pedidos:', error);
    }
  }

  async create(order: OrderRepoModel.Order): Promise<OrderRepoModel.Response> {
    const orders = this.loadOrders();
    const newOrder = {
      id: order.id,
      userId: order.userId,
      products: order.products,
      totalAmount: order.totalAmount,
      paymentMethod: order.paymentMethod,
      status: order.status,
      createdAt: new Date(),
    };
    orders.push(newOrder as OrderRepoModel.Order);
    this.saveOrders(orders);
    return new Promise((resolve) =>
      resolve({
        id: newOrder.id,
        totalAmount: newOrder.totalAmount,
        paymentMethod: newOrder.paymentMethod,
      }),
    );
  }
}
