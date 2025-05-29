import { Controller } from '@nestjs/common';
import { OrderProductsService } from './order-products.service';

@Controller('order-products')
export class OrderProductsController {
  constructor(private readonly orderProductsService: OrderProductsService) {}
}
