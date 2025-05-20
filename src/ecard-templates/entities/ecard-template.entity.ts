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

  @ApiProperty({ required: false, default: true })
  visible: boolean;

  @ApiProperty({ required: false, default: false })
  premium: boolean;

  @ApiProperty()
  stripeProductID: string | null;

  @ApiProperty()
  stripePriceID: string | null;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  includedOptions: string[];
}
