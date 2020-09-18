import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ObjectType } from 'src/types';
import { RoleEntity } from './role.entity';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly rolesService: RoleService) {}

  @Post()
  async createRole(@Body() data: ObjectType): Promise<RoleEntity> {
    return await this.rolesService.createRole(data);
  }

  @Delete(':id')
  async deleteRoleById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<string> {
    return await this.rolesService.deleteRoleById(id);
  }

  @Patch(':id')
  async modifyRoleById(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() data: ObjectType,
  ): Promise<string> {
    return await this.rolesService.modifyRoleById(id, data);
  }

  @Get()
  async roleList(): Promise<RoleEntity[]> {
    return await this.rolesService.roleList();
  }

  @Get(':id')
  async roleById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<RoleEntity> {
    return await this.rolesService.roleById(id);
  }
}
