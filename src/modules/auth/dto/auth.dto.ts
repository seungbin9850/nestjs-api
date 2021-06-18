import { IsString } from 'class-validator';

export class AuthDTO {
  @IsString()
  readonly userId: string;

  @IsString()
  readonly password: string;
}
