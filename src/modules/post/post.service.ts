import { Injectable } from '@nestjs/common';
import { Post } from 'src/entities/post.entity';
import { HttpError } from 'src/exception';
import { PostRepository } from 'src/repositories';
import { makeId } from 'src/utils/uuid';
import { UpdatePostDTO, WritePostDTO } from './dto';
import { GetPostsListDTO } from './dto/get-posts-list.dto';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async create(req: WritePostDTO, userId: string) {
    const { title, content } = req;
    const post = new Post();
    post.id = await makeId();
    post.title = title;
    post.content = content;
    post.userId = userId;
    await this.postRepository.save(post);
  }

  async getPostList(req: GetPostsListDTO) {
    const { page } = req;
    return await this.postRepository.getList(Number(page));
  }

  async updatePost(req: UpdatePostDTO, userId: string, postId: string) {
    const { title, content } = req;
    const post = await this.postRepository.findOne(postId);
    if (post.userId !== userId) throw new HttpError(403, 'Not Your Post');
    post.title = title;
    post.content = content;
    await this.postRepository.save(post);
  }
}
