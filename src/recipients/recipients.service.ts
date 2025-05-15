import { Injectable } from '@nestjs/common';
import { CreateRecipientDto } from './dto/create-recipient.dto';
import { UpdateRecipientDto } from './dto/update-recipient.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RecipientsService {
  constructor(private prisma: PrismaService) {}
  create(createRecipientDto: CreateRecipientDto) {
    return this.prisma.recipient.create({ data: createRecipientDto });
  }

  findAll() {
    return `This action returns all recipients`;
  }

  findOne(id: number) {
    return `This action returns a #${id} recipient`;
  }

  update(id: number, updateRecipientDto: UpdateRecipientDto) {
    return `This action updates a #${id} recipient`;
  }

  remove(id: number) {
    return `This action removes a #${id} recipient`;
  }
}
