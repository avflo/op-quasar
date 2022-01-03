import { Test, TestingModule } from '@nestjs/testing';
import { TrilaterationService } from './trilateration.service';

describe('TrilaterationService', () => {
  let service: TrilaterationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrilaterationService],
    }).compile();

    service = module.get<TrilaterationService>(TrilaterationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
