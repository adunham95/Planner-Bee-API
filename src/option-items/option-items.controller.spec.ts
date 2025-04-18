import { Test, TestingModule } from '@nestjs/testing';
import { OptionItemsController } from './option-items.controller';
import { OptionItemsService } from './option-items.service';

describe('OptionItemsController', () => {
  let controller: OptionItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OptionItemsController],
      providers: [OptionItemsService],
    }).compile();

    controller = module.get<OptionItemsController>(OptionItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
