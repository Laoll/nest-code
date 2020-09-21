import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getConnection, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { UserExtendEntity } from './entities/user_extend.entity';
import { ObjectType } from 'src/types';
import { RoleEntity } from '../role/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async createUser(data: { [propName: string]: any }): Promise<UserEntity> {
    return await this.userRepository.save(data);
  }

  async create(data: any) {
    const { username, password, mobile, address } = data;
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const user = queryRunner.manager.create(UserEntity, {
        username,
        password,
      });
      await queryRunner.manager.save(UserEntity, user);
      await queryRunner.manager.save(UserExtendEntity, {
        mobile,
        address,
        user,
      });
      await queryRunner.commitTransaction();
      return '创建成功';
    } catch (e) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException('创建失败');
    }
  }

  async userList(): Promise<UserEntity[]> {
    return await this.userRepository.find({
      order: { createdAt: 'DESC' },
      relations: ['userDetail', 'roles', 'posts'],
    });
  }

  async modifyUserById(
    id: number,
    data: { [key: string]: any },
  ): Promise<UpdateResult> {
    return await this.userRepository.update(id, data);
  }

  async deleteUserById(id: number): Promise<UpdateResult> {
    return await this.userRepository.update(id, { isDel: 1 });
  }

  async getUserInfo(id: number) {
    return await this.userRepository.findOne(id);
  }

  async assignRole(data: ObjectType) {
    const { userId, roleList } = data;
    const roles = await this.roleRepository.findByIds(roleList);
    const user = await this.userRepository.findOne(userId, {
      relations: ['roles'],
    });
    console.log(JSON.stringify(user));

    user.roles.push(roles[0]);
    await this.userRepository.save(user);

    console.log(JSON.stringify(roles));
    // return await this.userRepository.update(userId, {
    //   roles: roles,
    // });
  }
}
