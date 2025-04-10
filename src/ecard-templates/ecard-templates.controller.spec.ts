import { Test, TestingModule } from '@nestjs/testing';
import { EcardTemplatesController } from './ecard-templates.controller';
import { EcardTemplatesService } from './ecard-templates.service';

describe('EcardTemplatesController', () => {
  let controller: EcardTemplatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EcardTemplatesController],
      providers: [EcardTemplatesService],
    }).compile();

    controller = module.get<EcardTemplatesController>(EcardTemplatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
