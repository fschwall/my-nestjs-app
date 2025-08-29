import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiQuery, ApiBody } from '@nestjs/swagger';
import { CreateWeatherDto } from '../weather/dto/create-weather.dto';
import { WeatherResponseDto } from '../weather/dto/weather-response.dto';

export const GetCurrentWeatherApi = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get current weather by city or coordinates' }),
    ApiQuery({ name: 'city', required: false, description: 'City name' }),
    ApiQuery({
      name: 'lat',
      required: false,
      description: 'Latitude',
      type: Number,
    }),
    ApiQuery({
      name: 'lon',
      required: false,
      description: 'Longitude',
      type: Number,
    }),
    ApiQuery({
      name: 'units',
      required: false,
      description: 'Units (metric/imperial/kelvin)',
      enum: ['metric', 'imperial', 'kelvin'],
    }),
    ApiResponse({
      status: 200,
      description: 'Current weather data',
      type: WeatherResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad request - missing parameters or invalid data',
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized - API key not configured',
    }),
  );

export const GetForecastApi = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get weather forecast by city or coordinates' }),
    ApiQuery({ name: 'city', required: false, description: 'City name' }),
    ApiQuery({
      name: 'lat',
      required: false,
      description: 'Latitude',
      type: Number,
    }),
    ApiQuery({
      name: 'lon',
      required: false,
      description: 'Longitude',
      type: Number,
    }),
    ApiQuery({
      name: 'units',
      required: false,
      description: 'Units (metric/imperial/kelvin)',
      enum: ['metric', 'imperial', 'kelvin'],
    }),
    ApiResponse({ status: 200, description: 'Weather forecast data' }),
    ApiResponse({
      status: 400,
      description: 'Bad request - missing parameters or invalid data',
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized - API key not configured',
    }),
  );

export const CreateWeatherApi = () =>
  applyDecorators(
    ApiOperation({ summary: 'Get current weather (POST method)' }),
    ApiBody({
      type: CreateWeatherDto,
      description: 'Weather request parameters',
    }),
    ApiResponse({
      status: 200,
      description: 'Current weather data',
      type: WeatherResponseDto,
    }),
    ApiResponse({
      status: 400,
      description: 'Bad request - missing parameters or invalid data',
    }),
    ApiResponse({
      status: 401,
      description: 'Unauthorized - API key not configured',
    }),
  );
