import { ApiProperty } from '@nestjs/swagger';
import { PartyBoxTemplate } from '@prisma/client';
export class PartyBoxTemplateEntity implements PartyBoxTemplate {
	@ApiProperty()
	sku: string;

	@ApiProperty()
	id: string;

	@ApiProperty()
	createdAt: Date;

	@ApiProperty()
	updatedAt: Date;
}
