import { Injectable } from '@nestjs/common';
import { HttpError } from 'src/exception';
import { UserRepository } from 'src/repositories';
import { compare, makeToken } from 'src/utils';
import { AuthDTO } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async auth(req: AuthDTO) {
    const { userId, password } = req;
    const user = await this.userRepository.findOneById(userId);
    if (!user) throw new HttpError(404, 'user not found');
    const check = compare(password, user.password);
    if (!check) throw new HttpError(401, 'password incorrect');
    const accessToken = await makeToken(userId);
    return accessToken;
  }
}
