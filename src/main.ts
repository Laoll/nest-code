import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LogMiddleware } from './middlewares/log.middleware';
import { test1MiddleWares } from './middlewares/test';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 使用自定义中间件
  app.use(test1MiddleWares());
  await app.listen(3000);
}
bootstrap();
