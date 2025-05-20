import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateEcardTemplateDto {
  @IsString()
  @IsNotEmpty()
  @Length(4)
  @ApiProperty()
  sku: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  @ApiProperty()
  description: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  cost: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  imageURL?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false, default: false })
  visible?: boolean;

  @IsString()
  @IsOptional()
  @ApiProperty()
  stripeProductID?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  stripePriceID?: string;
}
