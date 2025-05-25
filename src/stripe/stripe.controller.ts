import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}
  @Post('products')
  async createProduct(
    @Body() body: { name: string; description: string; price: number },
  ) {
    return this.stripeService.createProduct(
      body.name,
      body.description,
      body.price,
    );
  }

  @Post('create-checkout-session')
  async createCheckoutSession(@Body() { skus = [] }: { skus?: string[] }) {
    return this.stripeService.createCheckoutSession(skus);
  }

  @Get('checkout-session/:id/line-items')
  async getCheckoutSession(@Param('id') id: string) {
    return this.stripeService.checkoutSessionLineItems(id);
  }
}
