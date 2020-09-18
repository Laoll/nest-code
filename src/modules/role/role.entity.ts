import { UserEntity } from '../user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('roles')
export class RoleEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    comment: '主键id',
  })
  id: number;

  @Column({
    type: 'varchar',
    name: 'name',
    nullable: false,
    unique: true,
    comment: 'role名称',
  })
  name: string;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: false,
    name: 'created_at',
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

  @ManyToMany(
    () => UserEntity,
    user => user.roles,
  )
  @JoinTable({ name: 'user_role' })
  user: UserEntity[];
}
