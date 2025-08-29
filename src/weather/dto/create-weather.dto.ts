import {
  IsOptional,
  IsString,
  IsNumber,
  Min,
  Max,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateWeatherDto {
  @ApiProperty({
    description: 'City name (e.g., "London", "New York")',
    example: 'London',
    required: false,
  })
  @IsOptional()
  @IsString()
  city?: string;

  @ApiProperty({
    description: 'Latitude coordinate (-90 to 90)',
    example: 51.5074,
    minimum: -90,
    maximum: 90,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(-90)
  @Max(90)
  lat?: number;

  @ApiProperty({
    description: 'Longitude coordinate (-180 to 180)',
    example: -0.1278,
    minimum: -180,
    maximum: 180,
    required: false,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(-180)
  @Max(180)
  lon?: number;

  @ApiProperty({
    description: 'Temperature units',
    enum: ['metric', 'imperial', 'kelvin'],
    example: 'metric',
    default: 'metric',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsIn(['metric', 'imperial', 'kelvin'])
  units?: 'metric' | 'imperial' | 'kelvin' = 'metric';
}
