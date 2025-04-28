import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateOptionItemDto } from 'src/option-items/dto/create-option-item.dto';

export class CreateEcardBodyDto {
  @IsString()
  @IsEmail()
  @ApiProperty()
  senderEmail: string;

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
  eCardTemplateSku: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  status?: string;

  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => CreateOptionItemDto)
  options?: CreateOptionItemDto[];
}
