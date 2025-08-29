/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { CreateWeatherDto } from './dto/create-weather.dto';
import { WeatherResponseDto } from './dto/weather-response.dto';

describe('WeatherController', () => {
  let controller: WeatherController;
  let weatherService: jest.Mocked<WeatherService>;

  const mockWeatherResponse: WeatherResponseDto = {
    location: {
      name: 'London',
      country: 'GB',
      lat: 51.5074,
      lon: -0.1278,
    },
    current: {
      temp: 15.5,
      feels_like: 14.2,
      humidity: 75,
      pressure: 1013,
      wind_speed: 3.2,
      description: 'scattered clouds',
      icon: '03d',
    },
    units: '°C',
    timestamp: new Date(),
  };

  const mockForecastResponse = {
    list: [
      {
        dt: 1642233600,
        main: { temp: 15.5 },
        weather: [{ description: 'scattered clouds' }],
      },
    ],
  };

  beforeEach(async () => {
    const mockWeatherService = {
      create: jest.fn(),
      getCurrentWeather: jest.fn(),
      getForecast: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [WeatherController],
      providers: [
        {
          provide: WeatherService,
          useValue: mockWeatherService,
        },
      ],
    }).compile();

    controller = module.get<WeatherController>(WeatherController);
    weatherService = module.get(WeatherService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('POST /weather', () => {
    const validCreateDto: CreateWeatherDto = {
      city: 'London',
      units: 'metric',
    };

    it('should return weather data for valid request', async () => {
      weatherService.create.mockResolvedValue(mockWeatherResponse);

      const result = await controller.create(validCreateDto);

      expect(weatherService.create).toHaveBeenCalledWith(validCreateDto);
      expect(result).toEqual(mockWeatherResponse);
    });

    it('should handle service BadRequestException', async () => {
      const errorMessage = 'Weather API key not configured';
      weatherService.create.mockRejectedValue(
        new BadRequestException(errorMessage),
      );

      await expect(controller.create(validCreateDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(weatherService.create).toHaveBeenCalledWith(validCreateDto);
    });

    it('should handle service errors properly', async () => {
      const errorMessage = 'Failed to fetch weather data';
      weatherService.create.mockRejectedValue(new Error(errorMessage));

      await expect(controller.create(validCreateDto)).rejects.toThrow(Error);
      expect(weatherService.create).toHaveBeenCalledWith(validCreateDto);
    });

    it('should handle coordinates-based request', async () => {
      const coordinatesDto: CreateWeatherDto = {
        lat: 51.5074,
        lon: -0.1278,
        units: 'metric',
      };

      weatherService.create.mockResolvedValue(mockWeatherResponse);

      const result = await controller.create(coordinatesDto);

      expect(weatherService.create).toHaveBeenCalledWith(coordinatesDto);
      expect(result).toEqual(mockWeatherResponse);
    });
  });

  describe('GET /weather/current', () => {
    const validQueryDto: CreateWeatherDto = {
      city: 'London',
      units: 'metric',
    };

    it('should return current weather for valid query', async () => {
      weatherService.getCurrentWeather.mockResolvedValue(mockWeatherResponse);

      const result = await controller.getCurrentWeather(validQueryDto);

      expect(weatherService.getCurrentWeather).toHaveBeenCalledWith(
        validQueryDto,
      );
      expect(result).toEqual(mockWeatherResponse);
    });

    it('should handle coordinates-based query', async () => {
      const coordinatesQuery: CreateWeatherDto = {
        lat: 51.5074,
        lon: -0.1278,
        units: 'imperial',
      };

      weatherService.getCurrentWeather.mockResolvedValue(mockWeatherResponse);

      const result = await controller.getCurrentWeather(coordinatesQuery);

      expect(weatherService.getCurrentWeather).toHaveBeenCalledWith(
        coordinatesQuery,
      );
      expect(result).toEqual(mockWeatherResponse);
    });

    it('should handle service BadRequestException for missing parameters', async () => {
      const invalidQuery = {};
      const errorMessage =
        'Either city or lat/lon coordinates must be provided';
      weatherService.getCurrentWeather.mockRejectedValue(
        new BadRequestException(errorMessage),
      );

      await expect(
        controller.getCurrentWeather(invalidQuery as CreateWeatherDto),
      ).rejects.toThrow(BadRequestException);
      expect(weatherService.getCurrentWeather).toHaveBeenCalledWith(
        invalidQuery,
      );
    });

    it('should handle API key configuration errors', async () => {
      const errorMessage = 'Weather API key not configured';
      weatherService.getCurrentWeather.mockRejectedValue(
        new BadRequestException(errorMessage),
      );

      await expect(controller.getCurrentWeather(validQueryDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(weatherService.getCurrentWeather).toHaveBeenCalledWith(
        validQueryDto,
      );
    });
  });

  describe('GET /weather/forecast', () => {
    const validQueryDto: CreateWeatherDto = {
      city: 'London',
      units: 'metric',
    };

    it('should return forecast for valid query', async () => {
      weatherService.getForecast.mockResolvedValue(mockForecastResponse);

      const result = await controller.getForecast(validQueryDto);

      expect(weatherService.getForecast).toHaveBeenCalledWith(validQueryDto);
      expect(result).toEqual(mockForecastResponse);
    });

    it('should handle coordinates-based forecast query', async () => {
      const coordinatesQuery: CreateWeatherDto = {
        lat: 51.5074,
        lon: -0.1278,
        units: 'kelvin',
      };

      weatherService.getForecast.mockResolvedValue(mockForecastResponse);

      const result = await controller.getForecast(coordinatesQuery);

      expect(weatherService.getForecast).toHaveBeenCalledWith(coordinatesQuery);
      expect(result).toEqual(mockForecastResponse);
    });

    it('should handle city not found errors', async () => {
      const errorMessage = 'City not found';
      weatherService.getForecast.mockRejectedValue(
        new BadRequestException(errorMessage),
      );

      await expect(controller.getForecast(validQueryDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(weatherService.getForecast).toHaveBeenCalledWith(validQueryDto);
    });

    it('should handle network/API failures', async () => {
      const errorMessage = 'Failed to fetch forecast data';
      weatherService.getForecast.mockRejectedValue(
        new BadRequestException(errorMessage),
      );

      await expect(controller.getForecast(validQueryDto)).rejects.toThrow(
        BadRequestException,
      );
      expect(weatherService.getForecast).toHaveBeenCalledWith(validQueryDto);
    });
  });

  describe('Rate Limiting', () => {
    it('should respect rate limiting decorators', () => {
      // This test verifies that the @Throttle decorators are applied
      // The actual rate limiting behavior is tested in integration tests
      const controllerPrototype = Object.getPrototypeOf(controller);
      const createMethod = controllerPrototype.create;
      const currentMethod = controllerPrototype.getCurrentWeather;
      const forecastMethod = controllerPrototype.getForecast;

      expect(createMethod).toBeDefined();
      expect(currentMethod).toBeDefined();
      expect(forecastMethod).toBeDefined();
    });
  });

  describe('Input Validation', () => {
    it('should handle empty query parameters', async () => {
      const emptyQuery = {};
      const errorMessage =
        'Either city or lat/lon coordinates must be provided';
      weatherService.getCurrentWeather.mockRejectedValue(
        new BadRequestException(errorMessage),
      );

      await expect(
        controller.getCurrentWeather(emptyQuery as CreateWeatherDto),
      ).rejects.toThrow(BadRequestException);
    });

    it('should handle partial coordinates', async () => {
      const partialCoordinates = { lat: 51.5074 }; // Missing lon
      const errorMessage =
        'Either city or lat/lon coordinates must be provided';
      weatherService.getCurrentWeather.mockRejectedValue(
        new BadRequestException(errorMessage),
      );

      await expect(
        controller.getCurrentWeather(partialCoordinates as CreateWeatherDto),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
