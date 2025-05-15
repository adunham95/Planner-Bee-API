import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';

export class CreateRecipientDto {
  @IsString()
  @ApiProperty()
  @IsOptional()
  firstName?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsEmail()
  @ApiProperty()
  @IsOptional()
  email?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  @IsPhoneNumber()
  eCardID?: string;
}
