import { Module, Logger } from '@nestjs/common';
import { AppController } from './app.controller';
import { WeatherModule } from './weather/weather.module';
import { TerminusModule } from '@nestjs/terminus';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    WeatherModule,
    TerminusModule,
  ],
  controllers: [AppController],
  providers: [Logger],
})
export class AppModule {}
