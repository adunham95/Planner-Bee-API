import { ApiProperty } from '@nestjs/swagger';
import { ECardTemplate } from '@prisma/client';

export class EcardTemplateEntity implements ECardTemplate {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  sku: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  cost: number;

  @ApiProperty({ required: false, nullable: true })
  imageURL: string | null;

  @ApiProperty({ required: false, default: false })
  visible: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  includedOptions: string[];
}
