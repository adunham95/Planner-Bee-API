import { Module } from '@nestjs/common';
import { EcardsService } from './ecards.service';
import { EcardsController } from './ecards.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [EcardsController],
  providers: [EcardsService],
  imports: [PrismaModule, JwtModule, AuthModule],
})
export class EcardsModule {}
