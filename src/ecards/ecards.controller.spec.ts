import { Test, TestingModule } from '@nestjs/testing';
import { EcardsController } from './ecards.controller';
import { EcardsService } from './ecards.service';

describe('EcardsController', () => {
  let controller: EcardsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EcardsController],
      providers: [EcardsService],
    }).compile();

    controller = module.get<EcardsController>(EcardsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
