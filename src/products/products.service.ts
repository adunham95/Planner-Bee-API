import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
	constructor(private prisma: PrismaService) {}
	async create(createProductDto: CreateProductDto) {
		createProductDto.sku = createProductDto.sku.toUpperCase();

		if (createProductDto.productType === 'ecard') {
			await this.prisma.eCardTemplate.create({
				data: { sku: createProductDto.sku }
			});
			createProductDto.eCardTemplateSKU = createProductDto.sku;
		}

		return this.prisma.product.create({ data: createProductDto });
	}

	findAll() {
		return this.prisma.product.findMany();
	}

	findFeatured() {
		return this.prisma.product.findMany({ where: { featured: true, visible: true } });
	}

	findECards() {
		return this.prisma.product.findMany({ where: { visible: true, productType: 'ecard' } });
	}

	findPartyBoxes() {
		return this.prisma.product.findMany({ where: { visible: true, productType: 'party-box' } });
	}

	findAvailable() {
		return this.prisma.product.findMany({ where: { visible: true } });
	}

	findOne(id: string) {
		return this.prisma.product.findFirst({ where: { id } });
	}

	findOneBySku(sku: string) {
		return this.prisma.product.findFirst({
			where: { sku },
			include: { eCardTemplate: { include: { components: true } } }
		});
	}

	update(id: string, updateProductDto: UpdateProductDto) {
		if (updateProductDto.sku) {
			updateProductDto.sku = updateProductDto.sku.toUpperCase();
		}
		return this.prisma.product.update({ where: { id }, data: updateProductDto });
	}

	remove(id: string) {
		return this.prisma.product.delete({ where: { id } });
	}
}
