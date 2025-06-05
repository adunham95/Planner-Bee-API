import { Test, TestingModule } from '@nestjs/testing';
import { PartyBoxSuppliesController } from './party-box-supplies.controller';
import { PartyBoxSuppliesService } from './party-box-supplies.service';

describe('PartyBoxSuppliesController', () => {
  let controller: PartyBoxSuppliesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartyBoxSuppliesController],
      providers: [PartyBoxSuppliesService],
    }).compile();

    controller = module.get<PartyBoxSuppliesController>(PartyBoxSuppliesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
