import { Module } from '@nestjs/common';
import { EcardsService } from './ecards.service';
import { EcardsController } from './ecards.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [EcardsController],
  providers: [EcardsService],
  imports: [PrismaModule],
})
export class EcardsModule {}
