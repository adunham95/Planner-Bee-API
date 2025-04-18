import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsOptional, IsString } from 'class-validator';
import { CreateOptionItemDto } from 'src/option-items/dto/create-option-item.dto';

export class CreateEcardDto {
  @IsString()
  @IsEmail()
  @ApiProperty()
  senderEmail: string;

  @IsDateString()
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
  options?: CreateOptionItemDto[];
}
