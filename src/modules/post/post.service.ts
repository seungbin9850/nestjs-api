import { Injectable } from '@nestjs/common';
import { Post } from 'src/entities/post.entity';
import { PostRepository } from 'src/repositories';
import { makeId } from 'src/utils/uuid';
import { WritePostDTO } from './dto';

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
}
