/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { MemCacheService } from './mem-cache.service';

describe('MemCacheService', () => {
  let service: MemCacheService;
  let cacheManager: jest.Mocked<any>;
  let configService: jest.Mocked<ConfigService>;

  beforeEach(async () => {
    const mockCacheManager = {
      get: jest.fn(),
      set: jest.fn(),
      del: jest.fn(),
    };

    const mockConfigService = {
      get: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MemCacheService,
        {
          provide: CACHE_MANAGER,
          useValue: mockCacheManager,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
      ],
    }).compile();

    service = module.get<MemCacheService>(MemCacheService);
    cacheManager = module.get(CACHE_MANAGER);
    configService = module.get(ConfigService);

    // Reset mocks before each test
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('get', () => {
    it('should return cached value when cache is enabled and value exists', async () => {
      const key = 'test-key';
      const expectedValue = { data: 'test-data' };

      // Mock config service to return cache enabled
      configService.get.mockImplementation((key: string) => {
        if (key === 'CACHE_ENABLED') return 'true';
        if (key === 'CACHE_EXPIRY_SECONDS') return 600;
        return undefined;
      });

      cacheManager.get.mockResolvedValue(expectedValue);

      const result = await service.get(key);

      expect(cacheManager.get).toHaveBeenCalledWith(`weather:${key}`);
      expect(result).toEqual(expectedValue);
    });

    it('should return null when cache is disabled', async () => {
      const key = 'test-key';

      configService.get.mockImplementation((key: string) => {
        if (key === 'CACHE_ENABLED') return 'false';
        return undefined;
      });

      const result = await service.get(key);

      expect(cacheManager.get).not.toHaveBeenCalled();
      expect(result).toBeNull();
    });

    it('should return null when cache key does not exist', async () => {
      const key = 'test-key';

      configService.get.mockImplementation((key: string) => {
        if (key === 'CACHE_ENABLED') return 'true';
        return undefined;
      });

      cacheManager.get.mockResolvedValue(null);

      const result = await service.get(key);

      expect(cacheManager.get).toHaveBeenCalledWith(`weather:${key}`);
      expect(result).toBeNull();
    });
  });

  describe('set', () => {
    it('should set cache value when cache is enabled', async () => {
      const key = 'test-key';
      const value = { data: 'test-data' };

      configService.get.mockImplementation((key: string) => {
        if (key === 'CACHE_ENABLED') return 'true';
        if (key === 'CACHE_EXPIRY_SECONDS') return 600;
        return undefined;
      });

      await service.set(key, value);

      expect(cacheManager.set).toHaveBeenCalledWith(
        `weather:${key}`,
        value,
        600,
      );
    });

    it('should not set cache when cache is disabled', async () => {
      const key = 'test-key';
      const value = { data: 'test-data' };

      configService.get.mockImplementation((key: string) => {
        if (key === 'CACHE_ENABLED') return 'false';
        return undefined;
      });

      await service.set(key, value);

      expect(cacheManager.set).not.toHaveBeenCalled();
    });
  });

  describe('del', () => {
    it('should delete cache key when cache is enabled', async () => {
      const key = 'test-key';

      configService.get.mockImplementation((key: string) => {
        if (key === 'CACHE_ENABLED') return 'true';
        return undefined;
      });

      await service.del(key);

      expect(cacheManager.del).toHaveBeenCalledWith(`weather:${key}`);
    });

    it('should not delete cache when cache is disabled', async () => {
      const key = 'test-key';

      configService.get.mockImplementation((key: string) => {
        if (key === 'CACHE_ENABLED') return 'false';
        return undefined;
      });

      await service.del(key);

      expect(cacheManager.del).not.toHaveBeenCalled();
    });
  });
});
