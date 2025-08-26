import { Logger } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController, AppModule],
      providers: [Logger, ConfigService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(appController).toBeDefined();
    });

    it('should return "my-nextjs-app"', () => {
      expect(appController.getApp()).toBe('my-nextjs-app');
    });
  });
});
