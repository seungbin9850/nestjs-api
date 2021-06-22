import { IsString, Length } from 'class-validator';

export class WritePostDTO {
  @IsString()
  @Length(1, 100)
  title: string;

  @IsString()
  @Length(1, 1000)
  content: string;
}
