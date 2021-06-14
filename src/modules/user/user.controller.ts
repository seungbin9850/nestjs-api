import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/')
  async createUser(@Body() req: CreateUserDTO) {
    await this.userService.createUser(req);
    return { status: 201, message: 'success' };
  }
}
