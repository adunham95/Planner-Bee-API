import { Injectable } from '@nestjs/common';
import { CreateEcardTemplateDto } from './dto/create-ecard-template.dto';
import { UpdateEcardTemplateDto } from './dto/update-ecard-template.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class EcardTemplatesService {
  constructor(private prisma: PrismaService) {}

  create(createEcardTemplateDto: CreateEcardTemplateDto) {
    const sku = createEcardTemplateDto.sku.toUpperCase();

    createEcardTemplateDto.sku = sku;

    return this.prisma.eCardTemplate.create({ data: createEcardTemplateDto });
  }

  findAll() {
    return this.prisma.eCardTemplate.findMany({
      include: { components: true },
    });
  }

  findAvailable() {
    return this.prisma.eCardTemplate.findMany({ where: { visible: true } });
  }

  findFeatured() {
    return this.prisma.featuredItem.findMany({
      include: { ecardTemplate: true },
    });
  }

  findOneBySku(sku: string) {
    return this.prisma.eCardTemplate.findFirst({
      where: { sku },
      include: { components: true },
    });
  }

  findOne(id: string) {
    return this.prisma.eCardComponent.findFirst({ where: { id } });
  }

  update(id: string, updateEcardTemplateDto: UpdateEcardTemplateDto) {
    if (updateEcardTemplateDto.sku) {
      const sku = updateEcardTemplateDto.sku.toUpperCase();

      updateEcardTemplateDto.sku = sku;
    }
    return this.prisma.eCardTemplate.update({
      where: { id },
      data: updateEcardTemplateDto,
    });
  }

  remove(id: string) {
    return this.prisma.eCardTemplate.delete({ where: { id } });
  }
}
