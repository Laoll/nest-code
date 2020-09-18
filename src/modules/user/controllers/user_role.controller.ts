import 'reflect-metadata';
import { Controller, Post, Body } from '@nestjs/common';
import { ObjectType } from 'src/types';
import { UserService } from '../user.service';

@Controller('user_role')
export class UserRoleController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async assignRole(@Body() data: ObjectType): Promise<any> {
    return await this.userService.assignRole(data);
  }
}
