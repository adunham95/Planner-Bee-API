import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
	constructor(private readonly productsService: ProductsService) {}

	@Post()
	create(@Body() createProductDto: CreateProductDto) {
		return this.productsService.create(createProductDto);
	}

	@Get('/all')
	findAll() {
		return this.productsService.findAll();
	}

	@Get('featured')
	findFeatured() {
		return this.productsService.findFeatured();
	}

	@Get('ecards')
	findECards() {
		return this.productsService.findECards();
	}

	@Get('party-boxes')
	findPartyBoxes() {
		return this.productsService.findPartyBoxes();
	}

	@Get()
	findVisible() {
		return this.productsService.findAvailable();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.productsService.findOne(id);
	}

	@Get('sku/:sku')
	findOneBySku(@Param('sku') sku: string) {
		return this.productsService.findOneBySku(sku);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
		return this.productsService.update(id, updateProductDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.productsService.remove(id);
	}
}
