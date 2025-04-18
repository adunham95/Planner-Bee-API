import { PartialType } from '@nestjs/swagger';
import { CreateEcardDto } from './create-ecard.dto';

export class UpdateEcardDto extends PartialType(CreateEcardDto) {}
