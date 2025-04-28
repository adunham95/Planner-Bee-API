import { Injectable } from '@nestjs/common';
import { CreateEcardDto } from './dto/create-ecard.dto';
import { UpdateEcardDto } from './dto/update-ecard.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { generateOrderNumber } from 'src/utils/gnerateOrderNumber';
import { CreateOptionItemDto } from 'src/option-items/dto/create-option-item.dto';

@Injectable()
export class EcardsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createEcardDto: CreateEcardDto,
    createOptionItemDto?: CreateOptionItemDto[],
  ) {
    createEcardDto.eCardNumber = generateOrderNumber('ECARD');

    const eCard = await this.prisma.eCard.create({
      data: createEcardDto,
    });

    const optionItems =
      createOptionItemDto?.map((opt) => {
        return {
          ...opt,
          eCardId: eCard.id,
        };
      }) || [];

    await this.prisma.optionItem.createMany({
      data: optionItems,
    });

    return eCard;
  }

  findAll() {
    return this.prisma.eCard.findMany();
  }

  async findOne(eCardNumber: string) {
    return this.prisma.eCard.findFirst({
      where: { eCardNumber },
      include: {
        options: {
          include: {
            eCardComponent: { select: { ecardComponentID: true, order: true } },
          },
        },
      },
    });
  }

  update(id: string, updateEcardDto: UpdateEcardDto) {
    console.log(updateEcardDto);
    return `This action updates a #${id} ecard`;
  }

  remove(id: string) {
    return `This action removes a #${id} ecard`;
  }
}
