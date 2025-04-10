import { Module } from '@nestjs/common';
import { EcardTemplatesService } from './ecard-templates.service';
import { EcardTemplatesController } from './ecard-templates.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [EcardTemplatesController],
  providers: [EcardTemplatesService],
  imports: [PrismaModule],
})
export class EcardTemplatesModule {}
