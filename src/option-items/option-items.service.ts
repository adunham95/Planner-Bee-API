import { Injectable } from '@nestjs/common';
import { CreateOptionItemDto } from './dto/create-option-item.dto';
import { UpdateOptionItemDto } from './dto/update-option-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OptionItemsService {
	constructor(private prisma: PrismaService) {}
	create(createOptionItemDto: CreateOptionItemDto) {
		return 'This action adds a new optionItem';
	}

	findAll() {
		return `This action returns all optionItems`;
	}

	findOne(id: number) {
		return `This action returns a #${id} optionItem`;
	}

	update(id: string, updateOptionItemDto: UpdateOptionItemDto) {
		return this.prisma.eCardOptionItem.update({
			where: { id },
			data: updateOptionItemDto
		});
	}

	remove(id: number) {
		return `This action removes a #${id} optionItem`;
	}
}
