import { Injectable } from '@nestjs/common';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { PaymentDTO } from '../dtos/payment.dto';

// fake respository just to simulate saving payment data
@Injectable()
export class PaymentRepository {
  private readonly DB_FILE = join(
    process.cwd(),
    'src/gateway/services/payments.json',
  );

  private getFilePath(): string {
    return this.DB_FILE;
  }

  loadPayments(): PaymentDTO[] {
    const filePath = this.getFilePath();
    if (!existsSync(filePath)) {
      return [];
    }
    try {
      const data = readFileSync(filePath, 'utf-8');
      if (!data || data.trim() === '') {
        return [];
      }
      const parsed: unknown = JSON.parse(data);
      // Garante que sempre retorna um array
      return Array.isArray(parsed) ? (parsed as PaymentDTO[]) : [];
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
      return [];
    }
  }

  save(payment: any): Promise<boolean> {
    const payments = this.loadPayments();
    payments.push(payment as PaymentDTO);
    return this.registerPayment(payments);
  }

  update(payments: PaymentDTO[]): Promise<boolean> {
    return this.registerPayment(payments);
  }

  private registerPayment(payment: any): Promise<boolean> {
    try {
      const filePath = this.getFilePath();
      const dirPath = join(filePath, '..');
      // Cria o diretório se não existir
      if (!existsSync(dirPath)) {
        mkdirSync(dirPath, { recursive: true });
      }
      writeFileSync(filePath, JSON.stringify(payment, null, 2), 'utf-8');
      return Promise.resolve(true);
    } catch (error) {
      console.error('Erro ao salvar pedidos:', error);
      return Promise.resolve(false);
    }
  }
}
