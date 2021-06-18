import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/')
  @HttpCode(200)
  async auth(@Body() req: AuthDTO) {
    const token = await this.authService.auth(req);
    return { status: 200, data: { token } };
  }
}
