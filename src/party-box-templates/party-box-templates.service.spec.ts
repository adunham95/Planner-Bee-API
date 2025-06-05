import { Test, TestingModule } from '@nestjs/testing';
import { PartyBoxTemplatesService } from './party-box-templates.service';

describe('PartyBoxTemplatesService', () => {
  let service: PartyBoxTemplatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PartyBoxTemplatesService],
    }).compile();

    service = module.get<PartyBoxTemplatesService>(PartyBoxTemplatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
