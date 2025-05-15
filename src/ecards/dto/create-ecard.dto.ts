import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateEcardDto {
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
}
