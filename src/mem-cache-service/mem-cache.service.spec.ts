import { Test, TestingModule } from '@nestjs/testing';
import { MemCacheService } from './mem-cache.service';

describe('MemCacheService', () => {
  let service: MemCacheService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MemCacheService],
    }).compile();

    service = module.get<MemCacheService>(MemCacheService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
