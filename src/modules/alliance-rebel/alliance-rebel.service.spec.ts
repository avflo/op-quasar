import { Test, TestingModule } from '@nestjs/testing';
import { AllianceRebelService } from './alliance-rebel.service';

describe('AllianceRebelService', () => {
  let service: AllianceRebelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AllianceRebelService],
    }).compile();

    service = module.get<AllianceRebelService>(AllianceRebelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
