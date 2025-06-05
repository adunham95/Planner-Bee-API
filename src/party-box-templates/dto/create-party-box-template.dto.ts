import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePartyBoxTemplateDto {
	@IsString()
	@ApiProperty()
	sku: string;
}
