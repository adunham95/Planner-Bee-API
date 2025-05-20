import { PartialType } from '@nestjs/swagger';
import { CreateEcardComponentDto } from './create-ecard-component.dto';

export class UpdateEcardComponentDto extends PartialType(
  CreateEcardComponentDto,
) {}
