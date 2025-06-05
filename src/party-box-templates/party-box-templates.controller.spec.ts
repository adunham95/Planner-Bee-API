import { Test, TestingModule } from '@nestjs/testing';
import { PartyBoxTemplatesController } from './party-box-templates.controller';
import { PartyBoxTemplatesService } from './party-box-templates.service';

describe('PartyBoxTemplatesController', () => {
  let controller: PartyBoxTemplatesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartyBoxTemplatesController],
      providers: [PartyBoxTemplatesService],
    }).compile();

    controller = module.get<PartyBoxTemplatesController>(PartyBoxTemplatesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
