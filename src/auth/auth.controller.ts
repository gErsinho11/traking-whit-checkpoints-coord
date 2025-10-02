import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsString, MinLength } from 'class-validator';

class LoginDto {
  @IsString()
  username!: string;

  @IsString()
  @MinLength(6)
  password!: string;
}

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly auth: AuthService) {}

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto.username, dto.password);
  }
}
