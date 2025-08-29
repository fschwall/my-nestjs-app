<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# my-nestjs-app

# Weather API

A robust NestJS-based weather API that provides current weather conditions and forecasts using the OpenWeatherMap API. Built with TypeScript, featuring in-memory caching, rate limiting, comprehensive validation, and Swagger documentation.

## 🚀 Features

- **Current Weather**: Get real-time weather data by city name or coordinates
- **Weather Forecast**: Retrieve 5-day weather forecasts
- **Smart Caching**: In-memory caching to reduce API calls and improve performance
- **Rate Limiting**: Tiered rate limiting to protect against abuse
- **Input Validation**: Comprehensive DTO validation with class-validator
- **API Documentation**: Interactive Swagger UI for easy testing
- **Error Handling**: Proper HTTP status codes and meaningful error messages
- **Logging**: Structured logging with Winston
- **Health Checks**: Built-in health monitoring endpoints

## 🛠 Tech Stack

- **Framework**: NestJS with TypeScript
- **Weather API**: OpenWeatherMap
- **Caching**: NestJS Cache Manager
- **Rate Limiting**: NestJS Throttler
- **Validation**: class-validator & class-transformer
- **Documentation**: Swagger/OpenAPI
- **Logging**: Winston
- **Testing**: Jest

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- OpenWeatherMap API key

## 🚀 Quick Start

### 1. Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd my-nestjs-app

# Install dependencies
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
# Weather API Configuration
OPENWEATHER_API_KEY=your_openweather_api_key_here
OPENWEATHER_BASE_URL=https://api.openweathermap.org/data/2.5

# Application Configuration
APP_PORT=3002
APP_NAME=my-nestjs-app
LOG_LEVEL=debug
NODE_ENV=development

# Cache Configuration
CACHE_ENABLED=true
CACHE_EXPIRY_SECONDS=600

# Application Insights (optional)
APPLICATIONINSIGHTS_CONNECTION_STRING=your_connection_string_here
```

### 3. Get OpenWeatherMap API Key

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Get your API key (may take 2-3 hours to activate)
4. Add it to your `.env` file

### 4. Run the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod
```

The API will be available at `http://localhost:3002`

## 📚 API Documentation

### Interactive Documentation

Visit `http://localhost:3002/api` for the interactive Swagger UI documentation.

### Available Endpoints

#### Get Current Weather

```bash
# By city name
GET /weather/current?city=London&units=metric

# By coordinates
GET /weather/current?lat=51.5074&lon=-0.1278&units=metric
```

#### Get Weather Forecast

```bash
# By city name
GET /weather/forecast?city=London&units=metric

# By coordinates
GET /weather/forecast?lat=51.5074&lon=-0.1278&units=metric
```

#### Create Weather Request (POST)

```bash
POST /weather
Content-Type: application/json

{
  "city": "London",
  "units": "metric"
}
```

### Query Parameters

| Parameter | Type   | Required | Description             | Example                              |
| --------- | ------ | -------- | ----------------------- | ------------------------------------ |
| `city`    | string | No\*     | City name               | `"London"`                           |
| `lat`     | number | No\*     | Latitude (-90 to 90)    | `51.5074`                            |
| `lon`     | number | No\*     | Longitude (-180 to 180) | `-0.1278`                            |
| `units`   | string | No       | Temperature units       | `"metric"`, `"imperial"`, `"kelvin"` |

\*Either `city` or both `lat` and `lon` must be provided.

### Response Format

```json
{
  "location": {
    "name": "London",
    "country": "GB",
    "lat": 51.5074,
    "lon": -0.1278
  },
  "current": {
    "temp": 15.5,
    "feels_like": 14.2,
    "humidity": 75,
    "pressure": 1013,
    "wind_speed": 3.2,
    "description": "scattered clouds",
    "icon": "03d"
  },
  "units": "°C",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## ⚙️ Configuration

### Environment Variables

| Variable               | Default                                   | Description                 |
| ---------------------- | ----------------------------------------- | --------------------------- |
| `OPENWEATHER_API_KEY`  | -                                         | Your OpenWeatherMap API key |
| `OPENWEATHER_BASE_URL` | `https://api.openweathermap.org/data/2.5` | OpenWeatherMap API base URL |
| `APP_PORT`             | `3002`                                    | Application port            |
| `APP_NAME`             | `my-nestjs-app`                           | Application name            |
| `LOG_LEVEL`            | `debug`                                   | Logging level               |
| `NODE_ENV`             | `development`                             | Environment                 |
| `CACHE_ENABLED`        | `true`                                    | Enable/disable caching      |
| `CACHE_EXPIRY_SECONDS` | `600`                                     | Cache TTL in seconds        |

### Rate Limiting

The API implements tiered rate limiting:

- **Global**: 100 requests/minute per IP
- **Weather endpoints**: 30 requests/minute per IP
- **External API calls**: 10 requests/minute per IP

## 🏗 Architecture

```
src/
├── app.controller.ts          # Main application controller
├── app.module.ts             # Root module
├── main.ts                   # Application bootstrap
├── weather/                  # Weather module
│   ├── weather.controller.ts # Weather endpoints
│   ├── weather.service.ts    # Business logic
│   ├── weather.module.ts     # Weather module
│   └── dto/                  # Data transfer objects
├── mem-cache-service/        # Caching service
│   ├── mem-cache.service.ts  # Cache implementation
│   └── mem-cache.module.ts   # Cache module
└── decorators/               # Custom decorators
    └── weather-api.decorator.ts # Swagger documentation
```

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Run test coverage
npm run test:cov
```

### Test Coverage

- **Unit Tests**: Controller, Service, and Cache service tests
- **E2E Tests**: Full API endpoint testing
- **Mocking**: External API calls are mocked for reliable testing

## 📊 Performance & Caching

### Caching Strategy

- **In-memory caching** with configurable TTL
- **Cache keys** include location and units for proper isolation
- **Cache invalidation** based on TTL
- **Cache bypass** when disabled via environment variable

### Performance Tips

- Use appropriate cache TTL (default: 10 minutes)
- Monitor rate limiting to avoid hitting OpenWeatherMap quotas
- Consider Redis for distributed caching in production

## 🔒 Security

- **Input validation** with class-validator
- **Rate limiting** to prevent abuse
- **Helmet** for security headers
- **Compression** for response optimization
- **Environment-based configuration**

## 🚀 Deployment

### Production Considerations

1. **Environment Variables**: Set all required environment variables
2. **API Key**: Ensure OpenWeatherMap API key is valid and has sufficient quota
3. **Caching**: Consider Redis for distributed caching
4. **Monitoring**: Set up logging and monitoring
5. **Rate Limiting**: Adjust limits based on your needs

### Docker Deployment

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY dist ./dist

EXPOSE 3002

CMD ["node", "dist/main"]
```

### Health Checks

```bash
# Application health
GET /status

# Response: {"message": "OK"}
```

## 🐛 Troubleshooting

### Common Issues

**1. API Key Not Configured**

```
Error: Weather API key not configured
```

**Solution**: Add `OPENWEATHER_API_KEY` to your `.env` file

**2. Rate Limit Exceeded**

```
HTTP 429: Too Many Requests
```

**Solution**: Wait for rate limit window to reset or adjust limits

**3. City Not Found**

```
Error: City not found
```

**Solution**: Check city name spelling or use coordinates instead

**4. Invalid Coordinates**

```
Error: Either city or lat/lon coordinates must be provided
```

**Solution**: Provide either city name or both lat/lon coordinates

### Debug Mode

Enable debug logging by setting:

```env
LOG_LEVEL=debug
```

## 📈 Monitoring & Logging

### Logging

The application uses Winston for structured logging:

- **Console output** in development
- **File logging** for errors
- **JSON format** with timestamps
- **Configurable log levels**

### Metrics

Consider adding:

- Request/response metrics
- Cache hit/miss ratios
- API response times
- Error rates

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- [NestJS Documentation](https://docs.nestjs.com/)
- [OpenWeatherMap API](https://openweathermap.org/api)
- [Swagger Documentation](https://swagger.io/)

---

Built with ❤️ using NestJS
