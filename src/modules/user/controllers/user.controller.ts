import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LogService } from '../../log/log.service';

import { UpdateResult } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../user.service';
import { AuthGuard } from 'src/guard/auth.guard';
import { LoggingInterceptor } from '../../../interceptors/logging.interceptor';
import { CreateUserTdo } from '../../../dto/create.user.dto';

@Controller('user')
@UseGuards(AuthGuard)
@UseInterceptors(LoggingInterceptor)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logService: LogService,
  ) {}

  @Get()
  async userList(): Promise<UserEntity[]> {
    throw new HttpException('获取数据错误', HttpStatus.OK);
    // return await this.userService.userList();
  }

  // @Post()
  // async createUser(
  //   @Body() data: { [propName: string]: any },
  // ): Promise<UserEntity> {
  //   return await this.userService.createUser(data);
  // }

  @Post()
  async create(@Body() data: CreateUserTdo) {
    return this.userService.create(data);
  }

  @Get(':id')
  async userInfo(@Param('id', new ParseIntPipe()) id: number) {
    return this.userService.getUserInfo(id);
  }

  @Delete(':id')
  async deleteUserById(@Param('id', new ParseIntPipe()) id: number) {
    return this.userService.deleteUserById(id);
  }

  @Patch(':id')
  async modifyUserById(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() data: { [key: string]: any },
  ): Promise<UpdateResult> {
    return await this.userService.modifyUserById(id, data);
  }
}
