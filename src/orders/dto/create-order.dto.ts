import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmpty, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateEcardBodyDto } from 'src/ecards/dto/create-ecard-body.dto';

export class CreateOrderDto {
	@IsInt()
	@IsOptional()
	@ApiProperty()
	customerID?: number;

	@IsString()
	@IsEmpty()
	@ApiProperty()
	orderNumber?: string;
}

export class AddProductToOrderDto {
	@IsString()
	@IsOptional()
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

	@IsInt()
	@IsOptional()
	@ApiProperty({ default: 1 })
	quantity: number;

	@ApiProperty({ required: false })
	@Type(() => CreateEcardBodyDto)
	eCard?: CreateEcardBodyDto;
}
