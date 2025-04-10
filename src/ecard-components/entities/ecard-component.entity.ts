import { ApiProperty } from '@nestjs/swagger';

export class EcardComponent {
  @ApiProperty()
  id: string;

  key: string;

  ecardComponentID: string;

  label?: string;

  editable?: boolean;

  default?: string;

  customStyles?: string;

  options?: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
