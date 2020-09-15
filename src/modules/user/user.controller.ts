import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Request,
  Response,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LogService } from '../log/log.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly logService: LogService,
  ) {}

  @Get()
  index(@Request() req) {
    console.log(req.cookies.name, '当前的cookie');
    console.log(req.session);
    return '主页';
  }

  @Get('login')
  login(@Response() res, @Request() req: { [key: string]: any }) {
    // 如果使使用了res就不能使用return，必须使用send
    res.cookie('name', 'hello', { maxAge: 1000 * 5, httpOnly: true });
    req.session.name = 'hello';
    res.send('登录页面');
  }

  /**
   * @Get([path])当前的path会拼接到@Controller('user')到里面user的路径后面，不写就表示为空的
   */
  @Get()
  // userList这个方法名随便自己定义,要见文思意就可以
  async userList(
    @Query('age', new ParseIntPipe()) age: number,
    @Query('name') name: string,
  ): Promise<any[]> {
    console.log(age, name);
    // 控制层访问服务层的userList方法
    this.logService.log('userlist');
    return await this.userService.userList();
  }

  @Get(':id')
  userInfo(@Param() params: any) {
    console.log(params); // 输出{ id: '2' }
    return '用户详情';
  }
}
