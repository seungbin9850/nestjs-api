import { IsString } from 'class-validator';

export class GetPostsListDTO {
  @IsString()
  page: string;
}
