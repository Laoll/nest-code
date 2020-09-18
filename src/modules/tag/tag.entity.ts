import { PostEntity } from '../post/post.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity('tags')
export class TagEntity {
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
    comment: 'tag名称',
  })
  name: string;

  @ManyToMany(
    type => PostEntity,
    post => post.tags,
  )
  @JoinTable({ name: 'tags_posts' })
  posts: PostEntity[];
}
