import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EstimateShopDto } from './dto/estimate-shop.dto';
@Injectable()
export class ShopService {
  constructor(private prisma: PrismaService) {}

  estimate(estimateShopDto: EstimateShopDto) {
    console.log({ estimateShopDto });
    return true;
  }
}
