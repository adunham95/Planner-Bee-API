import { Test, TestingModule } from '@nestjs/testing';
import { EcardComponentsService } from './ecard-components.service';

describe('EcardComponentsService', () => {
  let service: EcardComponentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EcardComponentsService],
    }).compile();

    service = module.get<EcardComponentsService>(EcardComponentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
