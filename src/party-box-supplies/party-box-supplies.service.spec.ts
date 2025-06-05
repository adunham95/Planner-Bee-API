import { Test, TestingModule } from '@nestjs/testing';
import { PartyBoxSuppliesService } from './party-box-supplies.service';

describe('PartyBoxSuppliesService', () => {
  let service: PartyBoxSuppliesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PartyBoxSuppliesService],
    }).compile();

    service = module.get<PartyBoxSuppliesService>(PartyBoxSuppliesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
