import { IsString } from 'class-validator';

export class UpdatePostDTO {
  @IsString()
  title: string;

  @IsString()
  content: string;
}
