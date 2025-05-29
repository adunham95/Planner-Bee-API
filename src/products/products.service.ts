import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProductsService {
	constructor(private prisma: PrismaService) {}
	create(createProductDto: CreateProductDto) {
		createProductDto.sku = createProductDto.sku.toUpperCase();
		return this.prisma.product.create({ data: createProductDto });
	}

	findAll() {
		return this.prisma.product.findMany();
	}

	findFeatured() {
		return this.prisma.product.findMany({ where: { featured: true, visible: true } });
	}

	findECards() {
		return this.prisma.product.findMany({ where: { visible: true, productType: 'eCard' } });
	}

	findPartyBoxes() {
		return this.prisma.product.findMany({ where: { visible: true, productType: 'party-boxes' } });
	}

	findAvailable() {
		return this.prisma.product.findMany({ where: { visible: true } });
	}

	findOne(id: string) {
		return this.prisma.product.findFirst({ where: { id } });
	}

	findOneBySky(sku: string) {
		return this.prisma.product.findFirst({ where: { sku } });
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
