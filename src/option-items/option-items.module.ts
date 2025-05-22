import { Module } from '@nestjs/common';
import { OptionItemsService } from './option-items.service';
import { OptionItemsController } from './option-items.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [OptionItemsController],
  providers: [OptionItemsService],
  imports: [PrismaModule],
})
export class OptionItemsModule {}
