import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/middlewares';
import { Token } from 'src/utils/decorators/user.decorator';
import { WritePostDTO } from './dto';
import { GetPostsListDTO } from './dto/get-posts-list.dto';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('/')
  @UseGuards(new AuthGuard())
  async writePost(@Body() req: WritePostDTO, @Token() decoded: any) {
    await this.postService.create(req, decoded.id);
    return { status: 201, message: 'success' };
  }

  @Get('/')
  @UseGuards(new AuthGuard())
  async getPosts(@Query() req: GetPostsListDTO, @Token() decoded: any) {
    const { id } = decoded;
    const posts = await this.postService.getPostList(req);
    const response = posts.map((post) => {
      post['isMine'] = false;
      if (post.userId === id) post['isMine'] = true;
      return {
        id: post.id,
        title: post.title,
        content: post.content,
      };
    });

    return { status: 200, message: 'success', data: response };
  }
}
