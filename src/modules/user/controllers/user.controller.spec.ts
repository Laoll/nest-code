import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from 'src/modules/role/role.entity';
import { UserEntity } from '../entities/user.entity';
import { UserController } from './user.controller';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forFeature([UserEntity]),
        TypeOrmModule.forFeature([RoleEntity]),
      ],
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    console.log(controller);
    expect(controller).toBeDefined();
  });
});
