import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PartyBoxTemplatesService } from './party-box-templates.service';
import { CreatePartyBoxTemplateDto } from './dto/create-party-box-template.dto';
import { UpdatePartyBoxTemplateDto } from './dto/update-party-box-template.dto';

@Controller('party-box-templates')
export class PartyBoxTemplatesController {
	constructor(private readonly partyBoxTemplatesService: PartyBoxTemplatesService) {}

	@Post()
	create(@Body() createPartyBoxTemplateDto: CreatePartyBoxTemplateDto) {
		return this.partyBoxTemplatesService.create(createPartyBoxTemplateDto);
	}

	@Get()
	findAll() {
		return this.partyBoxTemplatesService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.partyBoxTemplatesService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updatePartyBoxTemplateDto: UpdatePartyBoxTemplateDto) {
		return this.partyBoxTemplatesService.update(+id, updatePartyBoxTemplateDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.partyBoxTemplatesService.remove(+id);
	}
}
