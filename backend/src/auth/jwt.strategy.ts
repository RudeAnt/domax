import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // MVP: секрет читаем напрямую из env с дефолтом для локальной разработки.
      // Обязательно переопределить в .env / .env.example перед сдачей — см. README.
      secretOrKey: process.env.JWT_SECRET || 'domax-dev-secret-change-me',
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.usersService.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('Пользователь не найден');
    }
    // То, что возвращает validate(), Nest кладёт в req.user — именно этим
    // пользуется декоратор @CurrentUser() в контроллерах.
    return user;
  }
}
