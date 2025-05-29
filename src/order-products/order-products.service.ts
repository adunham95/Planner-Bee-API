import { Injectable } from '@nestjs/common';
import { CreateOrderProductDto } from './dto/create-order-products.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderProductsService {
	constructor(private prisma: PrismaService) {}
	create(createOrderProductDto: CreateOrderProductDto) {
		return this.prisma.orderProduct.create({ data: createOrderProductDto });
	}
}
