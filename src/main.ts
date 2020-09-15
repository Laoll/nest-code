import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
// 引入包
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

const PORT = process.env.PORT || 8080;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 配置静态文件的目录
  //方式一是直接访问:localhost:4000/1.jpg
  //app.useStaticAssets(join(__dirname, '..', 'public'));
  //方式二是访问:localhost:4000/static/1.jpg但是在public文件夹下不需要创建static目录
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/static/',
  });
  // 配置视图文件的目录
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');
  await app.listen(PORT, () => {
    Logger.log(`服务已经启动,请访问:http://wwww.localhost:${PORT}`);
  });
}
bootstrap();
