import { Test, TestingModule } from '@nestjs/testing';
import { EcardTemplatesService } from './ecard-templates.service';

describe('EcardTemplatesService', () => {
  let service: EcardTemplatesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EcardTemplatesService],
    }).compile();

    service = module.get<EcardTemplatesService>(EcardTemplatesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
