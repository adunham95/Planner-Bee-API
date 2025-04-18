import { Test, TestingModule } from '@nestjs/testing';
import { OptionItemsService } from './option-items.service';

describe('OptionItemsService', () => {
  let service: OptionItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OptionItemsService],
    }).compile();

    service = module.get<OptionItemsService>(OptionItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
