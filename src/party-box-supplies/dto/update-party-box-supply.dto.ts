import { PartialType } from '@nestjs/swagger';
import { CreatePartyBoxSupplyDto } from './create-party-box-supply.dto';

export class UpdatePartyBoxSupplyDto extends PartialType(CreatePartyBoxSupplyDto) {}
