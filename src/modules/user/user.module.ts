import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserEntity } from './entities/user.entity';
import { UserRoleController } from './controllers/user_role.controller';
import { RoleEntity } from '../role/role.entity';
import { UserController } from './controllers/user.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([RoleEntity]),
  ],
  controllers: [UserController, UserRoleController],
  providers: [UserService],
})
export class UserModule {}
