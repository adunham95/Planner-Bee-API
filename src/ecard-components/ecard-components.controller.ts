import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EcardComponentsService } from './ecard-components.service';
import { CreateEcardComponentDto } from './dto/create-ecard-component.dto';
import { UpdateEcardComponentDto } from './dto/update-ecard-component.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('ecard-components')
@ApiTags('ECard Components')
export class EcardComponentsController {
  constructor(
    private readonly ecardComponentsService: EcardComponentsService,
  ) {}

  @Post()
  create(@Body() createEcardComponentDto: CreateEcardComponentDto) {
    return this.ecardComponentsService.create(createEcardComponentDto);
  }

  @Get()
  findAll() {
    return this.ecardComponentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ecardComponentsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEcardComponentDto: UpdateEcardComponentDto,
  ) {
    return this.ecardComponentsService.update(id, updateEcardComponentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ecardComponentsService.remove(id);
  }
}
