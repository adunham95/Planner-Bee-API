import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PartyBoxSuppliesService } from './party-box-supplies.service';
import { CreatePartyBoxSupplyDto } from './dto/create-party-box-supply.dto';
import { UpdatePartyBoxSupplyDto } from './dto/update-party-box-supply.dto';

@Controller('party-box-supplies')
export class PartyBoxSuppliesController {
  constructor(private readonly partyBoxSuppliesService: PartyBoxSuppliesService) {}

  @Post()
  create(@Body() createPartyBoxSupplyDto: CreatePartyBoxSupplyDto) {
    return this.partyBoxSuppliesService.create(createPartyBoxSupplyDto);
  }

  @Get()
  findAll() {
    return this.partyBoxSuppliesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.partyBoxSuppliesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePartyBoxSupplyDto: UpdatePartyBoxSupplyDto) {
    return this.partyBoxSuppliesService.update(+id, updatePartyBoxSupplyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.partyBoxSuppliesService.remove(+id);
  }
}
