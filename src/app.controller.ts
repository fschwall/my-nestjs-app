import { Controller, Get, Logger } from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';

@Controller()
export class AppController {
  constructor(private readonly logger: Logger) {}
  @Get()
  getApp() {
    this.logger.log('my-nestjs-app');
    return 'my-nestjs-app';
  }

  @Get('status')
  @HealthCheck()
  getStatus() {
    this.logger.log('health check');
    return { message: 'OK' };
  }
}
