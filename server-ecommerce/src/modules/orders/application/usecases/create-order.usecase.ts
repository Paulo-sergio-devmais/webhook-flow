import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from '../../domain/models/create-order.dto';
import { OrderFailedValidation } from '../errors/new-order-failed-validation';
import { Order } from '../../domain/entities/Order';
import type { CreateOrderRepository } from '../repositories/create-order.repository';
import type { ProcessPayment } from 'src/modules/payments/domain/protocols/process-payment';

@Injectable()
export class CreateOrderUseCase {
  constructor(
    @Inject('CREATE_ORDER_REPOSITORY')
    private readonly createOrderRepository: CreateOrderRepository,
    @Inject('PROCESS_PAYMENT')
    private readonly paymentService: ProcessPayment,
  ) {}

  async execute(orderData: Partial<CreateOrderDto>): Promise<any> {
    const dto = new CreateOrderDto(orderData as CreateOrderDto);
    const validation = dto.validate();

    if (!validation.isValid) {
      throw new OrderFailedValidation(
        `Validation failed: ${validation.errors.join(', ')}`,
      );
    }

    // criar entidade Order (pedido)
    const order = new Order({ ...dto.toCreateOrderObj() });

    const createdOrder = await this.createOrderRepository.create(order);

    // cria um pagamento no service de pagamentos (simulado)
    const paymentResult = await this.paymentService.process({
      orderId: createdOrder.id,
      amount: createdOrder.totalAmount,
      method: createdOrder.paymentMethod,
    });

    return {
      orderId: createdOrder.id,
      paymentStatus: 'pending',
      paymentResult,
      //sessionId: paymentResult.sessionId,
    };
  }
}
