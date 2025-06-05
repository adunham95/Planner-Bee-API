import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateEcardComponentDto {
	@IsString()
	@ApiProperty()
	key: string;

	@IsString()
	@IsNotEmpty()
	@ApiProperty()
	ecardComponentID: string;

	@IsString()
	@IsOptional()
	@ApiProperty()
	ecardID: string;

	@IsString()
	@IsOptional()
	@ApiProperty()
	partyBoxTemplateID: string;

	@IsString()
	@IsOptional()
	@ApiProperty()
	label?: string;

	@IsOptional()
	@ApiProperty({ default: false })
	editable?: boolean;

	@IsOptional()
	@IsString()
	@ApiProperty()
	default?: string;

	@IsOptional()
	@IsString()
	@ApiProperty()
	customStyles?: string;

	@IsOptional()
	@ApiProperty()
	@IsArray()
	options?: string[];
}
