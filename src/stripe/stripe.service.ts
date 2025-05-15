import { Inject, Injectable, Logger } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;
  private readonly logger = new Logger(StripeService.name);

  constructor(
    @Inject('STRIPE_API_KEY')
    private readonly apiKey: string,
  ) {
    this.stripe = new Stripe(this.apiKey, {
      apiVersion: '2025-04-30.basil', // Use latest API version, or "null" for your default
    });
  }

  async createProduct(
    name: string,
    description: string,
    price: number,
  ): Promise<Stripe.Product> {
    try {
      const product = await this.stripe.products.create({ name, description });
      await this.stripe.prices.create({
        product: product.id,
        unit_amount: price * 100, // amount in cents
        currency: 'usd',
      });
      this.logger.log(`Product created successfully: ${name}`);
      return product;
    } catch (error) {
      this.logger.error('Failed to create product', error);
      throw error;
    }
  }
}
