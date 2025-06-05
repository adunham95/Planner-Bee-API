import { Module } from '@nestjs/common';
import { PartyBoxSuppliesService } from './party-box-supplies.service';
import { PartyBoxSuppliesController } from './party-box-supplies.controller';

@Module({
  controllers: [PartyBoxSuppliesController],
  providers: [PartyBoxSuppliesService],
})
export class PartyBoxSuppliesModule {}
