import { Test, TestingModule } from '@nestjs/testing';
import { ExamesController } from './exame.controller';

describe('ExamesController', () => {
  let controller: ExamesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExamesController],
    }).compile();

    controller = module.get<ExamesController>(ExamesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
