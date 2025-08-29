import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { WeatherModule } from './weather/weather.module';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 1 minute
        limit: 100, // 100 requests per minute (global default)
      },
      {
        ttl: 60000, // 1 minute
        limit: 30, // 30 requests per minute (weather endpoints)
        name: 'weather',
      },
      {
        ttl: 60000, // 1 minute
        limit: 10, // 10 requests per minute (external API calls)
        name: 'external-api',
      },
    ]),
    WeatherModule,
    TerminusModule,
  ],
  controllers: [AppController],
  providers: [Logger],
})
export class AppModule {}
