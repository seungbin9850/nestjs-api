import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/middlewares';
import { Token } from 'src/utils/decorators/user.decorator';
import {
  DeletePostDTO,
  GetDetailPostDTO,
  UpdatePostDTO,
  WritePostDTO,
} from './dto';
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
        date: post.date,
        isMine: post['isMine'],
      };
    });

    return { status: 200, message: 'success', data: response };
  }

  @Put('/:postId')
  @UseGuards(new AuthGuard())
  async updatePost(
    @Body() req: UpdatePostDTO,
    @Param() param: { postId: string },
    @Token() decoded: any,
  ) {
    const { id } = decoded;
    const { postId } = param;
    await this.postService.updatePost(req, id, postId);
    return { status: 200, message: 'success' };
  }

  @Get('/:postId')
  async getDetailPost(@Param() param: GetDetailPostDTO) {
    const post = await this.postService.getDetailPost(param);
    return {
      status: 200,
      messae: 'success',
      data: {
        id: post.id,
        title: post.title,
        content: post.content,
        date: post.date,
      },
    };
  }

  @Delete('/:postId')
  @UseGuards(new AuthGuard())
  async deletePost(@Param() param: DeletePostDTO, @Token() decoded: any) {
    await this.postService.deletePost(param, decoded.id);
    return { status: 200, message: 'success' };
  }
}
