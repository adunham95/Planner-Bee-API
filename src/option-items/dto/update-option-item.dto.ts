import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateOptionItemDto } from './create-option-item.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateOptionItemDto extends PartialType(CreateOptionItemDto) {
	@ApiProperty()
	@IsOptional()
	@IsString()
	key?: string;
}
