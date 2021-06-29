import { Post } from 'src/entities/post.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  async getList(page: number) {
    return await this.createQueryBuilder('post')
      .offset(page * 3)
      .limit(3)
      .getMany();
  }
}
