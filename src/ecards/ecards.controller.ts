import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EcardsService } from './ecards.service';
import { UpdateEcardDto } from './dto/update-ecard.dto';
import { CreateEcardBodyDto } from './dto/create-ecard-body.dto';

@Controller('ecards')
export class EcardsController {
  constructor(private readonly ecardsService: EcardsService) {}

  @Post()
  create(@Body() createEcardDto: CreateEcardBodyDto) {
    const options = createEcardDto.options;
    delete createEcardDto.options;

    return this.ecardsService.create(createEcardDto, options);
  }

  @Get()
  findAll() {
    return this.ecardsService.findAll();
  }

  @Get(':eCardNumber')
  findOne(@Param('eCardNumber') eCardNumber: string) {
    return this.ecardsService.findOne(eCardNumber);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEcardDto: UpdateEcardDto) {
    return this.ecardsService.update(id, updateEcardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ecardsService.remove(id);
  }
}
