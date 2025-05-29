import { Module } from '@nestjs/common';
import { OrderProductsService } from './order-products.service';
import { OrderProductsController } from './order-products.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
	controllers: [OrderProductsController],
	providers: [OrderProductsService],
	imports: [PrismaModule],
	exports: [OrderProductsService]
})
export class OrderProductsModule {}
