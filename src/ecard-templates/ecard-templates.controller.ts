import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EcardTemplatesService } from './ecard-templates.service';
import { CreateEcardTemplateDto } from './dto/create-ecard-template.dto';
import { UpdateEcardTemplateDto } from './dto/update-ecard-template.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('ecard-templates')
@ApiTags('ECard Templates')
export class EcardTemplatesController {
  constructor(private readonly ecardTemplatesService: EcardTemplatesService) {}

  @Post()
  create(@Body() createEcardTemplateDto: CreateEcardTemplateDto) {
    return this.ecardTemplatesService.create(createEcardTemplateDto);
  }

  @Get()
  findAll() {
    return this.ecardTemplatesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ecardTemplatesService.findOne(id);
  }

  @Get('sku/:sku')
  findOneBySku(@Param('sku') sku: string) {
    return this.ecardTemplatesService.findOneBySku(sku);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEcardTemplateDto: UpdateEcardTemplateDto,
  ) {
    return this.ecardTemplatesService.update(id, updateEcardTemplateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ecardTemplatesService.remove(id);
  }

  @Get('available')
  findAvailable() {
    return this.ecardTemplatesService.findAvailable();
  }
}
