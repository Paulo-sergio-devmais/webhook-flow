import { Body, Controller, Post } from '@nestjs/common';

@Controller('payments')
export class WebhookReturnController {
  @Post('webhook')
  async handle(@Body() data: any): Promise<string> {
    console.log('Webhook received payment update', data);
    return new Promise((resolve) => resolve('Webhook received'));
  }
}
