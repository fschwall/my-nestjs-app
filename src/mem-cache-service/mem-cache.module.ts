import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule } from '@nestjs/config';
import { MemCacheService } from './mem-cache.service';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: 600, // 10 minutes default
    }),
    ConfigModule,
  ],
  providers: [MemCacheService],
  exports: [MemCacheService],
})
export class MemCacheModule {}
