import {
  Injectable,
  OnApplicationBootstrap,
  OnModuleInit,
} from '@nestjs/common';

@Injectable()
export class UserService implements OnModuleInit, OnApplicationBootstrap {
  onModuleInit() {
    console.log('The module has been initialized.');
  }
  onApplicationBootstrap() {
    console.log('application Bootstrap');
  }
  async userList(): Promise<any[]> {
    return [
      {
        id: 0,
        name: '张三',
      },
      {
        id: 1,
        name: '李四1',
      },
    ];
  }
}
