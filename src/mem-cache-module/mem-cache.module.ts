import { Module, Logger } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import { MemCacheService } from '@src/mem-cache-service/mem-cache.service';

@Module({
  imports: [CacheModule.register()],
  providers: [MemCacheService, Logger, ConfigService],
  exports: [MemCacheService],
})
export class MemCacheModule {}
