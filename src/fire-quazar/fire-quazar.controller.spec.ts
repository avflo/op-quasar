import { Test, TestingModule } from '@nestjs/testing';
import { FireQuazarController } from './fire-quazar.controller';

describe('FireQuazarController', () => {
  let controller: FireQuazarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FireQuazarController],
    }).compile();

    controller = module.get<FireQuazarController>(FireQuazarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
