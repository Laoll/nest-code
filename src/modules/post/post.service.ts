import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PostEntity } from './post.entity';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postsRepository: Repository<PostEntity>,
  ) {}

  async createPosts(data: { [key: string]: any }): Promise<PostEntity> {
    const posts = await this.postsRepository.create(data);
    return await this.postsRepository.save(posts);
  }

  async deletePostsById(id: number): Promise<string> {
    const {
      raw: { affectedRows },
    } = await this.postsRepository.delete(id);
    if (affectedRows) {
      return '删除成功';
    } else {
      return '删除失败';
    }
  }

  async modifyPostsById(
    id: number,
    data: { [key: string]: any },
  ): Promise<string> {
    const {
      raw: { affectedRows },
    } = await this.postsRepository.update(id, data);
    if (affectedRows) {
      return '修改成功';
    } else {
      return '修改失败';
    }
  }

  async postsList(): Promise<PostEntity[]> {
    return await this.postsRepository.find();
  }

  async postsById(id: number): Promise<PostEntity> {
    return await this.postsRepository.findOne(id);
  }
}
