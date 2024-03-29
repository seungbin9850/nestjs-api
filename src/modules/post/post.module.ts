import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostRepository } from 'src/repositories';

@Module({
  imports: [TypeOrmModule.forFeature([PostRepository])],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
