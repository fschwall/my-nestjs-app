/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable, Logger, BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { CreateWeatherDto } from './dto/create-weather.dto';
// import { UpdateWeatherDto } from './dto/update-weather.dto';
import { WeatherResponseDto } from './dto/weather-response.dto';
import { MemCacheService } from '../mem-cache-service/mem-cache.service';

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly memCacheService: MemCacheService,
  ) {
    this.apiKey = this.configService.get<string>('OPENWEATHER_API_KEY') || '';
    this.baseUrl = this.configService.get<string>(
      'OPENWEATHER_BASE_URL',
      'https://api.openweathermap.org/data/2.5',
    );
    console.log('API Key loaded:', this.apiKey ? 'Present' : 'Missing');
    if (!this.apiKey) {
      this.logger.warn(
        'OPENWEATHER_API_KEY not found in environment variables',
      );
    }
  }

  async getCurrentWeather(
    createWeatherDto: CreateWeatherDto,
  ): Promise<WeatherResponseDto> {
    if (!this.apiKey) {
      throw new BadRequestException('Weather API key not configured');
    }

    const { city, lat, lon, units = 'metric' } = createWeatherDto;

    console.log(WeatherResponseDto);

    if (!city && (lat === undefined || lon === undefined)) {
      throw new BadRequestException(
        'Either city or lat/lon coordinates must be provided',
      );
    }

    try {
      let url: string;
      if (city) {
        console.log(city);
        console.log(encodeURIComponent(city));
        console.log(
          `${this.baseUrl}/weather?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=${units}`,
        );
        url = `${this.baseUrl}/weather?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=${units}`;
      } else {
        console.log(lat, lon);
        url = `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=${units}`;
      }

      this.logger.log(
        `Fetching weather data for ${city || `lat:${lat},lon:${lon}`}`,
      );

      const response = await firstValueFrom(this.httpService.get(url));
      const data = response.data;
      console.log(data);

      return {
        location: {
          name: data.name,
          country: data.sys.country,
          lat: data.coord.lat,
          lon: data.coord.lon,
        },
        current: {
          temp: data.main.temp,
          feels_like: data.main.feels_like,
          humidity: data.main.humidity,
          pressure: data.main.pressure,
          wind_speed: data.wind.speed,
          description: data.weather[0].description,
          icon: data.weather[0].icon,
        },
        units: units === 'metric' ? '°C' : units === 'imperial' ? '°F' : 'K',
        timestamp: new Date(),
      };
    } catch (error) {
      this.logger.error(`Failed to fetch weather data: ${error.message}`);
      if (error.response?.status === 404) {
        throw new BadRequestException('City not found');
      }
      throw new BadRequestException('Failed to fetch weather data');
    }
  }

  async getForecast(createWeatherDto: CreateWeatherDto): Promise<any> {
    if (!this.apiKey) {
      throw new BadRequestException('Weather API key not configured');
    }

    const { city, lat, lon, units = 'metric' } = createWeatherDto;

    if (!city && (lat === undefined || lon === undefined)) {
      throw new BadRequestException(
        'Either city or lat/lon coordinates must be provided',
      );
    }

    // Build cache key
    const cacheKey = city
      ? `forecast:${city.trim().toLowerCase()}:${units}`
      : `forecast:${lat}:${lon}:${units}`;

    // Try to get from cache first
    const cached = await this.memCacheService.get<any>(cacheKey);
    if (cached) {
      this.logger.log(
        `Returning cached forecast for ${city || `lat:${lat},lon:${lon}`}`,
      );
      return cached;
    }

    try {
      let url: string;
      if (city) {
        url = `${this.baseUrl}/forecast?q=${encodeURIComponent(city)}&appid=${this.apiKey}&units=${units}`;
      } else {
        url = `${this.baseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=${units}`;
      }

      this.logger.log(
        `Fetching forecast data for ${city || `lat:${lat},lon:${lon}`}`,
      );

      const response = await firstValueFrom(this.httpService.get(url));
      const data = response.data;

      // Cache the result
      await this.memCacheService.set(cacheKey, data);
      this.logger.log(`Cached forecast for ${city || `lat:${lat},lon:${lon}`}`);

      return data;
    } catch (error) {
      this.logger.error(`Failed to fetch forecast data: ${error.message}`);
      if (error.response?.status === 404) {
        throw new BadRequestException('City not found');
      }
      throw new BadRequestException('Failed to fetch forecast data');
    }
  }

  // Legacy methods for compatibility
  create(createWeatherDto: CreateWeatherDto) {
    return this.getCurrentWeather(createWeatherDto);
  }

  // findAll() {
  //   throw new BadRequestException('Please provide city or coordinates');
  // }

  // findOne(id: number) {
  //   throw new BadRequestException(
  //     'Please use getCurrentWeather with city or coordinates',
  //   );
  // }

  // update(id: number, updateWeatherDto: UpdateWeatherDto) {
  //   throw new BadRequestException('Weather data cannot be updated');
  // }

  // remove(id: number) {
  //   throw new BadRequestException('Weather data cannot be removed');
  // }
}
