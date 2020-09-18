import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { UserRoleController } from './controllers/user_role.controller';
import { RoleEntity } from '../role/role.entity';
import { UserController } from './controllers/user.controller';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AuthGuard } from 'src/guard/auth.guard';
import { LoggingInterceptor } from '../../interceptors/logging.interceptor';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([RoleEntity]),
  ],
  controllers: [UserController, UserRoleController],
  providers: [
    UserService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: LoggingInterceptor,
    // },
  ],
})
export class UserModule {}
