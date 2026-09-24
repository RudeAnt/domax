import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { DevLoginDto, MaxAuthDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //ручка для хакатона 
  @Post('dev-login')
  @ApiOperation({ summary: 'Мгновенный логин под ролью (только для демо/жюри)' })
  devLogin(@Body() dto: DevLoginDto) {
    return this.authService.devLogin(dto.role);
  }

  @Post('max')
  @ApiOperation({ summary: 'Логин через initData из MAX WebApp' })
  loginWithMax(@Body() dto: MaxAuthDto) {
    return this.authService.loginWithMax(dto.initData);
  }
}

