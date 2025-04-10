import { Test, TestingModule } from '@nestjs/testing';
import { EcardComponentsController } from './ecard-components.controller';
import { EcardComponentsService } from './ecard-components.service';

describe('EcardComponentsController', () => {
  let controller: EcardComponentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EcardComponentsController],
      providers: [EcardComponentsService],
    }).compile();

    controller = module.get<EcardComponentsController>(EcardComponentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
