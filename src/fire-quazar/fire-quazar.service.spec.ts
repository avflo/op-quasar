import { Test, TestingModule } from '@nestjs/testing';
import { FireQuazarService } from './fire-quazar.service';

describe('FireQuazarService', () => {
  let service: FireQuazarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FireQuazarService],
    }).compile();

    service = module.get<FireQuazarService>(FireQuazarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
