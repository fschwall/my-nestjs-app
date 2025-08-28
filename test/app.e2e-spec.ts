import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import type { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should get a 200 status reponse from GET request of /', () => {
    const server = app.getHttpServer() as App;
    return request(server).get('/').expect(200).expect('my-nestjs-app');
  });

  it('GET /status', () => {
    const server = app.getHttpServer() as App;
    return request(server).get('/status').expect(200).expect({ message: 'OK' });
  });
});
