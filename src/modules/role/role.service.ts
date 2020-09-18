import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from './role.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly rolesRepository: Repository<RoleEntity>,
  ) {}

  async createRole(data: { [key: string]: any }): Promise<RoleEntity> {
    const posts = await this.rolesRepository.create(data);
    return await this.rolesRepository.save(posts);
  }

  async deleteRoleById(id: number): Promise<string> {
    const {
      raw: { affectedRows },
    } = await this.rolesRepository.delete(id);
    if (affectedRows) {
      return '删除成功';
    } else {
      return '删除失败';
    }
  }

  async modifyRoleById(
    id: number,
    data: { [key: string]: any },
  ): Promise<string> {
    const {
      raw: { affectedRows },
    } = await this.rolesRepository.update(id, data);
    if (affectedRows) {
      return '修改成功';
    } else {
      return '修改失败';
    }
  }

  async roleList(): Promise<RoleEntity[]> {
    return await this.rolesRepository.find();
  }

  async roleById(id: number): Promise<RoleEntity> {
    return await this.rolesRepository.findOne(id);
  }
}
