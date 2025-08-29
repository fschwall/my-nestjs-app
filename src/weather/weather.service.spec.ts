import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { WeatherService } from './weather.service';
import { MemCacheService } from '../mem-cache-service/mem-cache.service';
import { CreateWeatherDto } from './dto/create-weather.dto';
// import { WeatherResponseDto } from './dto/weather-response.dto';
import { of } from 'rxjs';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpService: jest.Mocked<HttpService>;
  let configService: jest.Mocked<ConfigService>;
  // let memCacheService: jest.Mocked<MemCacheService>;

  // const mockWeatherResponse: WeatherResponseDto = {
  //   location: {
  //     name: 'London',
  //     country: 'GB',
  //     lat: 51.5074,
  //     lon: -0.1278,
  //   },
  //   current: {
  //     temp: 15.5,
  //     feels_like: 14.2,
  //     humidity: 75,
  //     pressure: 1013,
  //     wind_speed: 3.2,
  //     description: 'scattered clouds',
  //     icon: '03d',
  //   },
  //   units: '°C',
  //   timestamp: new Date(),
  // };

  const mockOpenWeatherResponse = {
    name: 'London',
    sys: { country: 'GB' },
    coord: { lat: 51.5074, lon: -0.1278 },
    main: {
      temp: 15.5,
      feels_like: 14.2,
      humidity: 75,
      pressure: 1013,
    },
    wind: { speed: 3.2 },
    weather: [{ description: 'scattered clouds', icon: '03d' }],
  };

  beforeEach(async () => {
    const mockHttpService = {
      get: jest.fn(),
    };

    const mockConfigService = {
      get: jest.fn(),
    };

    const mockMemCacheService = {
      get: jest.fn(),
      set: jest.fn(),
      del: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeatherService,
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: MemCacheService,
          useValue: mockMemCacheService,
        },
      ],
    }).compile();

    service = module.get<WeatherService>(WeatherService);
    httpService = module.get(HttpService);
    configService = module.get(ConfigService);
    memCacheService = module.get(MemCacheService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getCurrentWeather', () => {
    const validDto: CreateWeatherDto = {
      city: 'London',
      units: 'metric',
    };

    beforeEach(() => {
      // Mock API key
      configService.get.mockImplementation((key: string) => {
        if (key === 'OPENWEATHER_API_KEY') return 'test-api-key';
        if (key === 'OPENWEATHER_BASE_URL')
          return 'https://api.openweathermap.org/data/2.5';
        return undefined;
      });
    });

    it('should return weather data for valid city request', async () => {
      httpService.get.mockReturnValue(
        of({
          data: mockOpenWeatherResponse,
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {} as any,
        }),
      );

      const result = await service.getCurrentWeather(validDto);

      expect(httpService.get).toHaveBeenCalledWith(
        expect.stringContaining('q=London&appid=test-api-key&units=metric'),
      );
      expect(result).toEqual(
        expect.objectContaining({
          location: expect.objectContaining({ name: 'London' }),
          current: expect.objectContaining({ temp: 15.5 }),
        }),
      );
    });

    it('should return weather data for coordinates request', async () => {
      const coordinatesDto: CreateWeatherDto = {
        lat: 51.5074,
        lon: -0.1278,
        units: 'metric',
      };

      httpService.get.mockReturnValue(
        of({
          data: mockOpenWeatherResponse,
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {} as any,
        }),
      );

      const result = await service.getCurrentWeather(coordinatesDto);

      expect(httpService.get).toHaveBeenCalledWith(
        expect.stringContaining(
          'lat=51.5074&lon=-0.1278&appid=test-api-key&units=metric',
        ),
      );
      expect(result).toEqual(
        expect.objectContaining({
          location: expect.objectContaining({ name: 'London' }),
          current: expect.objectContaining({ temp: 15.5 }),
        }),
      );
    });

    it('should throw BadRequestException when API key is not configured', async () => {
      configService.get.mockReturnValue(''); // No API key

      await expect(service.getCurrentWeather(validDto)).rejects.toThrow(
        'Weather API key not configured',
      );
    });

    it('should throw BadRequestException when neither city nor coordinates provided', async () => {
      const invalidDto = { units: 'metric' } as CreateWeatherDto;

      await expect(service.getCurrentWeather(invalidDto)).rejects.toThrow(
        'Either city or lat/lon coordinates must be provided',
      );
    });

    it('should throw BadRequestException when only lat is provided', async () => {
      const invalidDto = { lat: 51.5074, units: 'metric' } as CreateWeatherDto;

      await expect(service.getCurrentWeather(invalidDto)).rejects.toThrow(
        'Either city or lat/lon coordinates must be provided',
      );
    });
  });

  describe('getForecast', () => {
    const validDto: CreateWeatherDto = {
      city: 'London',
      units: 'metric',
    };

    beforeEach(() => {
      configService.get.mockImplementation((key: string) => {
        if (key === 'OPENWEATHER_API_KEY') return 'test-api-key';
        if (key === 'OPENWEATHER_BASE_URL')
          return 'https://api.openweathermap.org/data/2.5';
        return undefined;
      });
    });

    it('should return forecast data for valid request', async () => {
      const mockForecastResponse = {
        list: [{ dt: 1642233600, main: { temp: 15.5 } }],
      };
      httpService.get.mockReturnValue(
        of({
          data: mockForecastResponse,
          status: 200,
          statusText: 'OK',
          headers: {},
          config: {} as any,
        }),
      );

      const result = await service.getForecast(validDto);

      expect(httpService.get).toHaveBeenCalledWith(
        expect.stringContaining(
          'forecast?q=London&appid=test-api-key&units=metric',
        ),
      );
      expect(result).toEqual(mockForecastResponse);
    });

    it('should throw BadRequestException when API key is not configured', async () => {
      configService.get.mockReturnValue(''); // No API key

      await expect(service.getForecast(validDto)).rejects.toThrow(
        'Weather API key not configured',
      );
    });
  });
});
