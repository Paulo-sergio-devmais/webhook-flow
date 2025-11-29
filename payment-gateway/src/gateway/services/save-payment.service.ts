import { Injectable } from '@nestjs/common';
import { PaymentDTO } from '../dtos/payment.dto';
import { PaymentRepository } from './payment-repository';

@Injectable()
export class SavePaymentService {
  constructor(private readonly paymentRepository: PaymentRepository) {}

  async savePayment(payment: PaymentDTO): Promise<boolean> {
    const savePayment = await this.paymentRepository.save(payment);
    return savePayment;
  }
}
