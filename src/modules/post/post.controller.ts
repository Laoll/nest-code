import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Get,
} from '@nestjs/common';
import { ObjectType } from 'src/types';
import { PostEntity } from './post.entity';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postsService: PostService) {}

  @Post()
  async createPosts(@Body() data: ObjectType): Promise<PostEntity> {
    return await this.postsService.createPosts(data);
  }

  @Delete(':id')
  async deletePostsById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<string> {
    return await this.postsService.deletePostsById(id);
  }

  @Patch(':id')
  async modifyPostsById(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() data: ObjectType,
  ): Promise<string> {
    return await this.postsService.modifyPostsById(id, data);
  }

  @Get()
  async postsList(): Promise<PostEntity[]> {
    return await this.postsService.postsList();
  }

  @Get(':id')
  async postsById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<PostEntity> {
    return await this.postsService.postsById(id);
  }
}
