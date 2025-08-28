import { Inject, Injectable, Logger } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import type { Cache } from 'cache-manager';

@Injectable()
export class MemCacheService {
  private readonly logger = new Logger(MemCacheService.name);
  private readonly cacheEnabled: boolean;
  private readonly ttlSeconds: number;

  constructor(
    @Inject(CACHE_MANAGER) private readonly cache: Cache,
    private readonly config: ConfigService,
  ) {
    this.cacheEnabled =
      this.config.get<string>('CACHE_ENABLED', 'true') === 'true';
    this.ttlSeconds = Number(
      this.config.get<number>('CACHE_EXPIRY_SECONDS', 600),
    );
  }

  private buildKey(key: string): string {
    return `weather:${key.trim().toLowerCase()}`;
  }

  async get<T>(key: string): Promise<T | null> {
    if (!this.cacheEnabled) {
      this.logger.debug('Cache disabled: get skipped');
      return null;
    }
    const cacheKey = this.buildKey(key);
    const value = await this.cache.get<T>(cacheKey);
    if (value == null) {
      this.logger.debug(`Cache MISS for key: ${cacheKey}`);
      return null;
    }
    this.logger.debug(`Cache HIT for key: ${cacheKey}`);
    return value;
  }

  async set<T>(key: string, value: T): Promise<void> {
    if (!this.cacheEnabled) {
      this.logger.debug('Cache disabled: set skipped');
      return;
    }
    const cacheKey = this.buildKey(key);
    await this.cache.set(cacheKey, value, this.ttlSeconds);
    this.logger.debug(
      `Cache SET for key: ${cacheKey} (ttl ${this.ttlSeconds}s)`,
    );
  }

  async del(key: string): Promise<void> {
    if (!this.cacheEnabled) {
      this.logger.debug('Cache disabled: del skipped');
      return;
    }
    const cacheKey = this.buildKey(key);
    await this.cache.del(cacheKey);
    this.logger.debug(`Cache DEL for key: ${cacheKey}`);
  }
}
