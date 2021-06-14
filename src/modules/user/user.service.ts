import { Injectable } from '@nestjs/common';
import { HttpError } from 'src/exception';
import { UserRepository } from 'src/repositories';
import { hash } from 'src/utils';
import { CreateUserDTO } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(req: CreateUserDTO) {
    const { userId, password } = req;
    if (await this.findUser(userId))
      throw new HttpError(409, 'Already Exists User');
    const hashed = hash(password);
    await this.userRepository.create({ userId, password: hashed });
  }

  private async findUser(userId: string) {
    const user = await this.userRepository.findOneById(userId);
    if (user) return true;
    return false;
  }
}
