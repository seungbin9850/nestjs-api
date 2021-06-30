import { IsString } from 'class-validator';

export class GetDetailPostDTO {
  @IsString()
  postId: string;
}
