import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/middlewares';
import { Token } from 'src/utils/decorators/user.decorator';
import { WritePostDTO } from './dto';
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
}
