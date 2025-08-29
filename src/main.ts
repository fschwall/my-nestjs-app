import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import appInsights from 'applicationinsights';
import compression from 'compression';
import helmet from 'helmet';
import { WinstonModule } from 'nest-winston';
import { format, transports } from 'winston';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Weather API')
    .setDescription('A NestJS weather API with OpenWeatherMap integration')
    .setVersion('1.0')
    .addTag('Weather', 'Weather-related endpoints')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Load config service
  const configService = app.get(ConfigService);

  // Winston logger
  app.useLogger(
    WinstonModule.createLogger({
      level: configService.get('LOG_LEVEL', 'debug'),
      defaultMeta: {
        service: configService.get<string>('APP_NAME', 'my-nestjs-app'),
      },
      format: format.combine(
        format.timestamp({ format: 'isoDateTime' }),
        format.json(),
        format.colorize({ all: true }),
      ),
      transports: [
        new transports.File({ filename: 'error.log', level: 'error' }),
        new transports.Console(),
      ],
    }),
  );

  // Compress responses
  app.use(compression());

  // Helmet security
  app.use(helmet());

  // Load application insights
  if (
    configService.get('NODE_ENV') === 'production' &&
    configService.get('APPLICATIONINSIGHTS_CONNECTION_STRING')
  ) {
    appInsights
      .setup()
      .setAutoCollectRequests(true)
      .setAutoCollectConsole(true, false)
      .start();
  }

  await app.listen(configService.get('APP_PORT', 3002));
}
void bootstrap();
