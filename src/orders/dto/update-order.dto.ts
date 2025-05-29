import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import { IsOptional, IsString } from 'class-validator';
import { CreateOrderProductDto } from 'src/order-products/dto/create-order-products.dto';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
	@IsString()
	@IsOptional()
	@ApiProperty()
	status?: string;
}

export class UpdateOrderProductDto extends PartialType(CreateOrderProductDto) {}
