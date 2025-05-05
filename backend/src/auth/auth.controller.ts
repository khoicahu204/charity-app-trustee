import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

console.log('📡 AuthController loaded');

@Controller('auth') // Base route: /auth
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register') // Route: POST /auth/register
  register(
    @Body() body: { name: string; email: string; password: string }
  ) {
    return this.authService.register(body);
  }
}