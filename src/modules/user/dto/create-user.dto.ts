import { IsString, Length } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @Length(6, 12)
  readonly userId: string;

  @IsString()
  readonly password: string;
}
