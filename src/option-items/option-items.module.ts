import { Module } from '@nestjs/common';
import { OptionItemsService } from './option-items.service';
import { OptionItemsController } from './option-items.controller';

@Module({
  controllers: [OptionItemsController],
  providers: [OptionItemsService],
})
export class OptionItemsModule {}
