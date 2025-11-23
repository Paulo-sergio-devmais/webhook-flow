export class CreateOrderDto {
  userId: string;
  products: {
    productId: string;
    qty: number;
  }[];
  totalAmount: number;
  paymentMethod: string;

  constructor(data: CreateOrderDto) {
    Object.assign(this, data);
  }

  validate(): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!this.userId?.trim()) errors.push('userId is required.');

    if (!Array.isArray(this.products) || this.products.length === 0)
      errors.push('At least one product is required.');
    else {
      this.products.forEach((item, index) => {
        if (!item.productId)
          errors.push(`products[${index}].productId is required.`);
        if (!item.qty || item.qty <= 0)
          errors.push(`products[${index}].qty must be greater than zero.`);
      });
    }

    if (this.totalAmount <= 0) {
      errors.push('Total amount must be greater than zero.');
    }

    if (!this.paymentMethod?.trim()) {
      errors.push('Payment method is required.');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  toCreateOrderObj() {
    return {
      userId: this.userId,
      products: this.products,
      totalAmount: this.totalAmount,
      paymentMethod: this.paymentMethod,
    };
  }
}
