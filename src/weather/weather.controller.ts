import {
  Controller,
  Get,
  Post,
  Body,
  // Patch,
  // Param,
  // Delete,
  Query,
  HttpCode,
  // UsePipes,
} from '@nestjs/common';
import { WeatherService } from './weather.service';
import { CreateWeatherDto } from './dto/create-weather.dto';
// import { WeatherValidationPipe } from './pipes/validation.pipe';
// import { UpdateWeatherDto } from './dto/update-weather.dto';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Post()
  // We could use a custom pipe like this if we want to customize the validation behavior
  // @UsePipes(
  //   new ValidationPipe({ whitelist: false, forbidNonWhitelisted: false }),
  // )
  @HttpCode(200)
  create(@Body() createWeatherDto: CreateWeatherDto) {
    return this.weatherService.create(createWeatherDto);
  }

  @Get('current')
  getCurrentWeather(@Query() query: CreateWeatherDto) {
    return this.weatherService.getCurrentWeather(query);
  }

  @Get('forecast')
  getForecast(@Query() query: CreateWeatherDto) {
    return this.weatherService.getForecast(query);
  }

  // @Get()
  // findAll() {
  //   return this.weatherService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.weatherService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateWeatherDto: UpdateWeatherDto) {
  //   return this.weatherService.update(+id, updateWeatherDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.weatherService.remove(+id);
  // }
}
