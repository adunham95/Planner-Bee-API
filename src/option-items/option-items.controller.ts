import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OptionItemsService } from './option-items.service';
import { CreateOptionItemDto } from './dto/create-option-item.dto';
import { UpdateOptionItemDto } from './dto/update-option-item.dto';

@Controller('option-items')
export class OptionItemsController {
  constructor(private readonly optionItemsService: OptionItemsService) {}

  @Post()
  create(@Body() createOptionItemDto: CreateOptionItemDto) {
    return this.optionItemsService.create(createOptionItemDto);
  }

  @Get()
  findAll() {
    return this.optionItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.optionItemsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOptionItemDto: UpdateOptionItemDto) {
    return this.optionItemsService.update(+id, updateOptionItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.optionItemsService.remove(+id);
  }
}
