import { Test, TestingModule } from '@nestjs/testing';
import { ImperialSignalService } from './imperial-signal.service';

describe('ImperialSignalService', () => {
  let service: ImperialSignalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImperialSignalService],
    }).compile();

    service = module.get<ImperialSignalService>(ImperialSignalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
