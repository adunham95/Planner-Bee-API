import { PartialType } from '@nestjs/swagger';
import { CreatePartyBoxTemplateDto } from './create-party-box-template.dto';

export class UpdatePartyBoxTemplateDto extends PartialType(CreatePartyBoxTemplateDto) {}
