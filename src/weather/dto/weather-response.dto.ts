import { ApiProperty } from '@nestjs/swagger';

export class WeatherResponseDto {
  @ApiProperty({
    description: 'Location information',
    example: {
      name: 'London',
      country: 'GB',
      lat: 51.5074,
      lon: -0.1278,
    },
  })
  location: {
    name: string;
    country: string;
    lat: number;
    lon: number;
  };

  @ApiProperty({
    description: 'Current weather conditions',
    example: {
      temp: 15.5,
      feels_like: 14.2,
      humidity: 75,
      pressure: 1013,
      wind_speed: 3.2,
      description: 'scattered clouds',
      icon: '03d',
    },
  })
  current: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    wind_speed: number;
    description: string;
    icon: string;
  };

  @ApiProperty({
    description: 'Temperature units',
    example: '°C',
    enum: ['°C', '°F', 'K'],
  })
  units: string;

  @ApiProperty({
    description: 'Timestamp when the data was fetched',
    example: '2024-01-15T10:30:00.000Z',
  })
  timestamp: Date;
}
