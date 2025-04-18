import { Injectable } from '@nestjs/common';
import { CreateEcardDto } from './dto/create-ecard.dto';
import { UpdateEcardDto } from './dto/update-ecard.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { generateOrderNumber } from 'src/utils/gnerateOrderNumber';

@Injectable()
export class EcardsService {
  constructor(private prisma: PrismaService) {}
  create(createEcardDto: CreateEcardDto) {
    createEcardDto.eCardNumber = generateOrderNumber('ECARD');

    const optionItems = createEcardDto.options;

    delete createEcardDto.options;

    const eCard = this.prisma.eCard.create({
      data: createEcardDto,
    });

    const ecardOptions = this.prisma.optionItem.createMany({
      data: [],
    });

    return eCard;
  }

  findAll() {
    return this.prisma.eCard.findMany();
  }

  findOne(eCardNumber: string) {
    return this.prisma.eCard.findFirst({ where: { eCardNumber } });
  }

  update(id: string, updateEcardDto: UpdateEcardDto) {
    return `This action updates a #${id} ecard`;
  }

  remove(id: string) {
    return `This action removes a #${id} ecard`;
  }
}
