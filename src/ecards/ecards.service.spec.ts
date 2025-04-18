import { Test, TestingModule } from '@nestjs/testing';
import { EcardsService } from './ecards.service';

describe('EcardsService', () => {
  let service: EcardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EcardsService],
    }).compile();

    service = module.get<EcardsService>(EcardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
