import { Injectable } from '@nestjs/common';
import { AddProductToOrderDto, CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { generateOrderNumber } from 'src/utils/gnerateOrderNumber';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderProductsService } from 'src/order-products/order-products.service';
import { EcardsService } from 'src/ecards/ecards.service';
import { CreateOrderProductDto } from 'src/order-products/dto/create-order-products.dto';

@Injectable()
export class OrdersService {
	constructor(
		private prisma: PrismaService,
		private orderProduct: OrderProductsService,
		private eCard: EcardsService
	) {}
	initialize(createOrderDto: CreateOrderDto) {
		createOrderDto.orderNumber = generateOrderNumber('PB');

		return this.prisma.order.create({ data: { orderNumber: '', ...createOrderDto } });
	}

	findMyOrders(customerID: number) {
		return this.prisma.order.findFirst({ where: { customerID } });
	}

	findOne(orderNumber: string) {
		return this.prisma.order.findFirst({ where: { orderNumber } });
	}

	update(id: string, updateOrderDto: UpdateOrderDto) {
		return this.prisma.order.update({ where: { id }, data: updateOrderDto });
	}

	remove(id: string) {
		return this.prisma.order.delete({ where: { id } });
	}

	async addProductToOrder(addProductToOrderDto: AddProductToOrderDto) {
		let orderNumber = addProductToOrderDto.orderNumber;

		if (!orderNumber) {
			const newOrder = await this.initialize({});
			orderNumber = newOrder.orderNumber;
		}

		const newOrderProduct: CreateOrderProductDto = {
			orderNumber: addProductToOrderDto.orderNumber,
			productSKU: addProductToOrderDto.productSKU,
			productType: addProductToOrderDto.productType,
			quantity: addProductToOrderDto.quantity
		};

		if (addProductToOrderDto.eCard) {
			const newECard = await this.eCard.create(addProductToOrderDto.eCard);
			newOrderProduct.eCardID = newECard.id;
		}

		const newProduct = await this.orderProduct.create(newOrderProduct);

		return newProduct;
	}
}
