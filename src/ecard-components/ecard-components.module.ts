import { Module } from '@nestjs/common';
import { EcardComponentsService } from './ecard-components.service';
import { EcardComponentsController } from './ecard-components.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [EcardComponentsController],
  providers: [EcardComponentsService],
  imports: [PrismaModule],
})
export class EcardComponentsModule {}
