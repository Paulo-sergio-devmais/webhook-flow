import { Order as OrderEntity } from '../../domain/entities/Order';

export namespace OrderRepoModel {
  export type Order = OrderEntity;

  export interface Response {
    id: string;
    totalAmount: number;
    paymentMethod: string;
  }
}
