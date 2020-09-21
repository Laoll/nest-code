import { UserExtendEntity } from './user_extend.entity';
import { PostEntity } from '../../post/post.entity';
import { RoleEntity } from '../../role/role.entity';
import { Exclude, Expose } from 'class-transformer';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToOne,
  OneToMany,
  UpdateDateColumn,
  ManyToMany,
  BeforeInsert,
} from 'typeorm';
import NodeAuth from 'node-auth0';

@Entity({ name: 'user' })
export class UserEntity {
  @Exclude()
  private nodeAuth: NodeAuth;

  constructor() {
    this.nodeAuth = new NodeAuth();
  }

  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '主键id',
  })
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
    length: 50,
    unique: true,
    name: 'username', // 如果是一样的可以不指定
    comment: '用户名',
  })
  username: string;

  @Exclude()
  @Column({
    type: 'varchar',
    nullable: false,
    length: 100,
    comment: '密码',
  })
  password: string;

  @Expose()
  isDelStr(): string {
    return this.isDel ? '删除' : '正常';
  }
  @Column('tinyint', {
    nullable: false,
    default: () => 0,
    name: 'is_del',
    comment: '是否删除,1表示删除,0表示正常',
  })
  isDel: number;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'created_at', // mysql数据库规范是使用下划线命名的,不使用驼峰
    comment: '创建时间',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'updated_at',
    comment: '更新时间',
  })
  updateAt: Date;

  @OneToOne(
    () => UserExtendEntity,
    userExtend => userExtend.user,
  )
  userDetail: UserExtendEntity;

  @OneToMany(
    () => PostEntity,
    post => post.user,
  )
  posts: PostEntity[];

  @ManyToMany(
    () => RoleEntity,
    role => role.user,
  )
  roles: RoleEntity[];

  @BeforeInsert()
  makePassword(): void {
    this.password = this.nodeAuth.makePassword(this.password);
  }
}
