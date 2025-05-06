import { Controller, Post, Body, UseGuards, Get, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';  
import { User as UserDecorator } from '../common/decorators/user.decorator'; // tránh trùng với entity



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

  @Post('login')
  login(@Body() body: { email: string; password: string }
  ) {
    return this.authService.login(body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getMe(@UserDecorator() user: any) 
  {
    return user; // được gán từ hàm validate trong JwtStrategy
  }


}