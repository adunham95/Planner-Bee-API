import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateOptionItemDto } from 'src/option-items/dto/create-option-item.dto';

export class CreateEcardBodyDto {
  @IsString()
  @IsEmail()
  @IsOptional()
  @ApiProperty()
  senderEmail: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  senderID: number;

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
