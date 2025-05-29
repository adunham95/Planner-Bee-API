import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { OrderProductsModule } from 'src/order-products/order-products.module';
import { EcardsModule } from 'src/ecards/ecards.module';

@Module({
	controllers: [OrdersController],
	providers: [OrdersService],
	imports: [PrismaModule, OrderProductsModule, EcardsModule]
})
export class OrdersModule {}
