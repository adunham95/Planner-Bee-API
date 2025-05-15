import { Module } from '@nestjs/common';
import { RecipientsService } from './recipients.service';
import { RecipientsController } from './recipients.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [RecipientsController],
  providers: [RecipientsService],
  imports: [PrismaModule],
  exports: [RecipientsService],
})
export class RecipientsModule {}
