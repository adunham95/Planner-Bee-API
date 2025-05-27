import { Inject, Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;
  private readonly logger = new Logger(StripeService.name);

  constructor(
    @Inject('STRIPE_API_SECRET')
    private readonly secretKey: string,
    @Inject('FRONT_END_URL')
    private readonly frontEndUrl: string,
    private prisma: PrismaService,
  ) {
    this.stripe = new Stripe(this.secretKey, {
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

  async createCheckoutSession(sku: string) {
    try {
      const products = await this.prisma.eCardTemplate.findMany({
        where: { sku },
      });

      if (products.length === 0) {
        throw new Error('No Line Items');
      }

      const line_items = products.map((p) => {
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `${p.name} ECard`,
            },
            unit_amount: p.cost,
          },
          quantity: 1,
        };
      });

      const session = await this.stripe.checkout.sessions.create({
        line_items,
        mode: 'payment',
        ui_mode: 'custom',
        payment_method_types: ['card'],
        // The URL of your payment completion page
        return_url:
          // 'https://example.com/return?session_id={CHECKOUT_SESSION_ID}',
          `http://${this.frontEndUrl}/shop/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      });
      return { checkoutSessionClientSecret: session.client_secret };
    } catch (error) {
      console.error('There was an error creating the checkout session', error);
      throw new Error('Error creating session');
    }
  }
}
