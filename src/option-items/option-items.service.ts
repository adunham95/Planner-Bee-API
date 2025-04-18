import { Injectable } from '@nestjs/common';
import { CreateOptionItemDto } from './dto/create-option-item.dto';
import { UpdateOptionItemDto } from './dto/update-option-item.dto';

@Injectable()
export class OptionItemsService {
  create(createOptionItemDto: CreateOptionItemDto) {
    return 'This action adds a new optionItem';
  }

  findAll() {
    return `This action returns all optionItems`;
  }

  findOne(id: number) {
    return `This action returns a #${id} optionItem`;
  }

  update(id: number, updateOptionItemDto: UpdateOptionItemDto) {
    return `This action updates a #${id} optionItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} optionItem`;
  }
}
