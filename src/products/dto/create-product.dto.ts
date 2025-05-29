import { ApiProperty } from '@nestjs/swagger';
import {
	IsBoolean,
	IsInt,
	IsNotEmpty,
	IsOptional,
	IsString,
	MaxLength,
	MinLength
} from 'class-validator';

export class CreateProductDto {
	@IsString()
	@IsNotEmpty()
	@MinLength(3)
	@ApiProperty()
	name: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(4)
	@ApiProperty()
	sku: string;

	@IsString()
	@IsNotEmpty()
	@MaxLength(500)
	@ApiProperty()
	description: string;

	@IsInt()
	@IsNotEmpty()
	@ApiProperty()
	price: number;

	@IsString()
	@IsOptional()
	@ApiProperty({ required: false })
	imageURL?: string;

	@IsBoolean()
	@IsOptional()
	@ApiProperty({ required: false, default: false })
	visible?: boolean;

	@IsBoolean()
	@IsOptional()
	@ApiProperty({ required: false, default: false })
	featured?: boolean;

	@IsString()
	@ApiProperty()
	productType: string;

	@IsString()
	@IsOptional()
	@ApiProperty()
	eCardTemplateSKU?: string;
}
