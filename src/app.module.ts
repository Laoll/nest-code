import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogModule } from './modules/log/log.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [UserModule, LogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
