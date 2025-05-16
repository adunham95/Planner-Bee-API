import { Controller, Get } from '@nestjs/common';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Get('upload-url')
  async createImageUploadURL() {
    return await this.imagesService.createImageUploadURL();
  }
}
