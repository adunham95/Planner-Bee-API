import { Injectable } from '@nestjs/common';
import { CreatePartyBoxSupplyDto } from './dto/create-party-box-supply.dto';
import { UpdatePartyBoxSupplyDto } from './dto/update-party-box-supply.dto';

@Injectable()
export class PartyBoxSuppliesService {
  create(createPartyBoxSupplyDto: CreatePartyBoxSupplyDto) {
    return 'This action adds a new partyBoxSupply';
  }

  findAll() {
    return `This action returns all partyBoxSupplies`;
  }

  findOne(id: number) {
    return `This action returns a #${id} partyBoxSupply`;
  }

  update(id: number, updatePartyBoxSupplyDto: UpdatePartyBoxSupplyDto) {
    return `This action updates a #${id} partyBoxSupply`;
  }

  remove(id: number) {
    return `This action removes a #${id} partyBoxSupply`;
  }
}
