import { Injectable } from '@nestjs/common';
import { CreatePartyBoxTemplateDto } from './dto/create-party-box-template.dto';
import { UpdatePartyBoxTemplateDto } from './dto/update-party-box-template.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PartyBoxTemplatesService {
	constructor(private prisma: PrismaService) {}

	create(createPartyBoxTemplateDto: CreatePartyBoxTemplateDto) {
		const sku = createPartyBoxTemplateDto.sku.toUpperCase();

		createPartyBoxTemplateDto.sku = sku;

		return this.prisma.partyBoxTemplate.create({ data: createPartyBoxTemplateDto });
	}

	findAll() {
		return `This action returns all partyBoxTemplates`;
	}

	findOne(id: number) {
		return `This action returns a #${id} partyBoxTemplate`;
	}

	findOneBySku(sku: string) {
		return this.prisma.partyBoxTemplate.findFirst({ where: { sku } });
	}

	update(id: number, updatePartyBoxTemplateDto: UpdatePartyBoxTemplateDto) {
		return `This action updates a #${id} partyBoxTemplate`;
	}

	remove(id: number) {
		return `This action removes a #${id} partyBoxTemplate`;
	}
}
