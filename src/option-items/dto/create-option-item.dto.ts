import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateOptionItemDto {
  @ApiProperty()
  @IsString()
  key: string;

  @ApiProperty()
  @IsString()
  value: string;
}
