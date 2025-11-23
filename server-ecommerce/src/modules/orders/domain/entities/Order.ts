import { randomBytes } from 'node:crypto';
import { OrderModel } from '../models/order';

export class Order {
  public readonly id: string;
  public readonly userId: string;
  public products: { productId: string; qty: number }[];
  public totalAmount: number;
  public paymentMethod: string;
  public status?: OrderModel.Status;
  public createdAt?: Date;

  constructor(props: Omit<Order, 'id'>) {
    Object.assign(this, props);

    this.id = this.generateId();
    this.status = props.status ?? ('PENDING' as OrderModel.Status);
    this.createdAt = props.createdAt ?? new Date();
  }

  private generateId(): string {
    return randomBytes(12).toString('hex');
  }
}
