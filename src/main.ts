import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { AuthGuard } from './guard/auth.guard';
// import { LogMiddleware } from './middlewares/log.middleware';
import { test1MiddleWares } from './middlewares/test';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 使用自定义中间件
  app.use(test1MiddleWares());
  // app.useGlobalGuards(new AuthGuard());
  // app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(3000);
}
bootstrap();
