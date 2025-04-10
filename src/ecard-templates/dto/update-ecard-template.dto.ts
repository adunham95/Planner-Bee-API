import { PartialType } from '@nestjs/swagger';
import { CreateEcardTemplateDto } from './create-ecard-template.dto';

export class UpdateEcardTemplateDto extends PartialType(CreateEcardTemplateDto) {}
