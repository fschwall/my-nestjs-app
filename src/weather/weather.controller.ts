import { Controller, Get, Post, Body, Query, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { WeatherService } from './weather.service';
import { CreateWeatherDto } from './dto/create-weather.dto';
import {
  GetCurrentWeatherApi,
  GetForecastApi,
  CreateWeatherApi,
} from '../decorators/weather-api.decorator';

@Controller('weather')
@ApiTags('Weather')
@Throttle({ default: { ttl: 60000, limit: 30 } }) // Weather endpoints: 30 requests/minute
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post()
  @CreateWeatherApi()
  @Throttle({ default: { ttl: 60000, limit: 10 } }) // External API calls: 10 requests/minute
  // We could use a custom pipe like this if we want to customize the validation behavior
  // @UsePipes(
  //   new ValidationPipe({ whitelist: false, forbidNonWhitelisted: false }),
  // )
  @HttpCode(200)
  create(@Body() createWeatherDto: CreateWeatherDto) {
    return this.weatherService.create(createWeatherDto);
  }

  @Get('current')
  @GetCurrentWeatherApi()
  @Throttle({ default: { ttl: 60000, limit: 10 } }) // External API calls: 10 requests/minute
  getCurrentWeather(@Query() query: CreateWeatherDto) {
    return this.weatherService.getCurrentWeather(query);
  }

  @Get('forecast')
  @GetForecastApi()
  @Throttle({ default: { ttl: 60000, limit: 10 } }) // External API calls: 10 requests/minute
  getForecast(@Query() query: CreateWeatherDto) {
    return this.weatherService.getForecast(query);
  }
}
