import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateOrderProductDto {
	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	orderNumber: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	productSKU: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	productType: string;

	@IsNumber()
	@IsOptional()
	@ApiProperty()
	quantity?: number;

	@IsString()
	@IsOptional()
	@ApiProperty()
	eCardID?: string;
}
