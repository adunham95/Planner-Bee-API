import { Controller, Post, Body } from '@nestjs/common';
import { ShopService } from './shop.service';
import { EstimateShopDto } from './dto/estimate-shop.dto';

@Controller('shop')
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post('/estimate')
  estimate(@Body() estimateShopDto: EstimateShopDto) {
    return this.shopService.estimate(estimateShopDto);
  }
}
