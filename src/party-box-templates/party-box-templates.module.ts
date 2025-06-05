import { Module } from '@nestjs/common';
import { PartyBoxTemplatesService } from './party-box-templates.service';
import { PartyBoxTemplatesController } from './party-box-templates.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
	controllers: [PartyBoxTemplatesController],
	providers: [PartyBoxTemplatesService],
	imports: [PrismaModule]
})
export class PartyBoxTemplatesModule {}
