import { Module } from '@nestjs/common';
import { ShopService } from './shop.service';
import { ShopController } from './shop.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ShopController],
  imports: [PrismaModule],
  providers: [ShopService],
})
export class ShopModule {}
