import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { MemCacheModule } from '../mem-cache-service/mem-cache.module';

@Module({
  imports: [HttpModule, ConfigModule, MemCacheModule],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class WeatherModule {}
