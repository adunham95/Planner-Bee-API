import { Injectable } from '@nestjs/common';
import { CreateEcardComponentDto } from './dto/create-ecard-component.dto';
import { UpdateEcardComponentDto } from './dto/update-ecard-component.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EcardComponentsService {
	constructor(private prisma: PrismaService) {}

	create(createEcardComponentDto: CreateEcardComponentDto) {
		return this.prisma.eCardComponent.create({ data: createEcardComponentDto });
	}

	findAll() {
		return this.prisma.eCardComponent.findMany();
	}

	findOne(id: string) {
		return this.prisma.eCardComponent.findFirst({ where: { id } });
	}

	update(id: string, updateEcardComponentDto: UpdateEcardComponentDto) {
		return this.prisma.eCardComponent.update({
			where: { id },
			data: updateEcardComponentDto
		});
	}

	remove(id: string) {
		return this.prisma.eCardComponent.delete({ where: { id } });
	}
}
