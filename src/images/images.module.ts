import { Module } from '@nestjs/common';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [ImagesController],
  providers: [ImagesService],
  imports: [PrismaModule, HttpModule],
})
export class ImagesModule {}
