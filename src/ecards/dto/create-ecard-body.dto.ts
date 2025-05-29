import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
	IsBoolean,
	IsDateString,
	IsEmail,
	IsNumber,
	IsOptional,
	IsString,
	ValidateNested
} from 'class-validator';
import { CreateOptionItemDto } from 'src/option-items/dto/create-option-item.dto';
import { CreateRecipientDto } from 'src/recipients/dto/create-recipient.dto';

export class CreateEcardBodyDto {
	// @IsString()
	// @IsEmail()
	// @IsOptional()
	// @ApiProperty()
	// senderEmail: string;

	// @IsNumber()
	// @IsOptional()
	// @ApiProperty()
	// senderID: number;

	@IsDateString()
	@IsOptional()
	@ApiProperty()
	deliveryDate?: Date;

	@IsString()
	@IsOptional()
	@ApiProperty()
	eCardNumber?: string;

	@IsString()
	@ApiProperty()
	eCardTemplateSKU: string;

	@IsString()
	@IsOptional()
	@ApiProperty()
	status?: string;

	@IsBoolean()
	@IsOptional()
	@ApiProperty({ default: false })
	isCustom?: boolean;

	@ApiProperty()
	@ValidateNested({ each: true })
	@Type(() => CreateOptionItemDto)
	options?: CreateOptionItemDto[];

	@ApiProperty()
	@ValidateNested({ each: true })
	@Type(() => CreateRecipientDto)
	recipients?: CreateRecipientDto[];
}
