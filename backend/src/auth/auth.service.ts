import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserRole } from '../users/entities/user.entity';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  // Для жюри/автотестов: выдаёт валидный JWT под нужную роль без прохождения
  // реальной авторизации MAX. Ручка отключаемая — см. заметку в auth.controller.ts.
  async devLogin(role: UserRole) {
    const user = await this.usersService.findOrCreateDevUser(role);
    return this.buildAuthResponse(user);
  }

  // Боевой вход через MAX WebApp: initData содержит подписанные данные пользователя.
  // MVP: парсим id/имя без криптографической проверки подписи — это заглушка,
  // явно обозначенная как таковая в README (см. "Известные ограничения").
  // Перед реальной проверкой подписи нужно свериться с актуальной документацией MAX Bridge.
  async loginWithMax(initData: string) {
    const parsed = this.parseInitData(initData);
    if (!parsed.userId) {
      throw new UnauthorizedException('Некорректный initData: отсутствует ID пользователя');
    }

    const user = await this.usersService.findOrCreateByMaxId(
      parsed.userId,
      parsed.fullName ?? 'Пользователь MAX',
    );
    return this.buildAuthResponse(user);
  }

  private buildAuthResponse(user: { id: string; role: UserRole }) {
    const payload: JwtPayload = { sub: user.id, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
      user: { id: user.id, role: user.role },
    };
  }

  // Разбор строки вида "user_id=123&first_name=Ivan&..." — формат уточняется
  // по актуальной документации MAX Bridge на момент интеграции.
  private parseInitData(initData: string): { userId?: string; fullName?: string } {
    const params = new URLSearchParams(initData);
    return {
      userId: params.get('user_id') ?? undefined,
      fullName: params.get('first_name') ?? undefined,
    };
  }
}

