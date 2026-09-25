import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createHmac } from 'crypto';
import { UsersService } from '../users/users.service';
import { UserRole } from '../users/entities/user.entity';
import { JwtPayload } from './jwt-payload.interface';

interface MaxUserPayload {
  id: number;
  first_name?: string;
  last_name?: string;
  username?: string | null;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async devLogin(role: UserRole) {
    const user = await this.usersService.findOrCreateDevUser(role);
    return this.buildAuthResponse(user);
  }

  // Боевой вход через MAX WebApp. initData валидируется по HMAC-SHA256
  // (см. документацию MAX: раздел "Валидация данных"). user.id читается
  // ТОЛЬКО из провалидированной строки — никогда из отдельного поля тела запроса,
  // иначе кто угодно сможет залогиниться под произвольным maxUserId.
  async loginWithMax(initData: string) {
    const params = this.validateAndParse(initData);

    const rawUser = params.get('user');
    if (!rawUser) {
      throw new UnauthorizedException('initData не содержит данные пользователя');
    }

    let maxUser: MaxUserPayload;
    try {
      maxUser = JSON.parse(rawUser);
    } catch {
      throw new UnauthorizedException('Некорректный формат поля user в initData');
    }

    if (!maxUser.id) {
      throw new UnauthorizedException('initData не содержит id пользователя');
    }

    const fullName = [maxUser.first_name, maxUser.last_name].filter(Boolean).join(' ') || 'Пользователь MAX';
    const user = await this.usersService.findOrCreateByMaxId(String(maxUser.id), fullName);
    return this.buildAuthResponse(user);
  }

  // Реализация алгоритма проверки подписи из документации MAX:
  // 1) распарсить key=value пары, 2) отделить и сохранить hash,
  // 3) URL-decode значений, 4) отсортировать по ключу, 5) собрать launch_params,
  // 6) secret_key = HMAC-SHA256("WebAppData", BOT_TOKEN),
  // 7) signature = hex(HMAC-SHA256(secret_key, launch_params)),
  // 8) сравнить с оригинальным hash.
  private validateAndParse(initData: string): Map<string, string> {
    const botToken = process.env.MAX_BOT_TOKEN;
    if (!botToken) {
      // Явная ошибка конфигурации, а не тихий пропуск валидации — если токен
      // не задан, логин через MAX должен падать, а не доверять непроверенным данным.
      throw new UnauthorizedException('MAX_BOT_TOKEN не сконфигурирован на сервере');
    }

    const rawPairs = initData.split('&').map((pair) => {
      const idx = pair.indexOf('=');
      return [pair.slice(0, idx), pair.slice(idx + 1)] as [string, string];
    });

    const hashEntries = rawPairs.filter(([key]) => key === 'hash');
    if (hashEntries.length !== 1) {
      throw new UnauthorizedException('initData повреждён: поле hash отсутствует или дублируется');
    }
    const originalHash = decodeURIComponent(hashEntries[0][1]);

    const decodedPairs = rawPairs
      .filter(([key]) => key !== 'hash')
      .map(([key, value]) => [key, decodeURIComponent(value)] as [string, string])
      .sort(([a], [b]) => a.localeCompare(b));

    const launchParams = decodedPairs.map(([key, value]) => `${key}=${value}`).join('\n');

    const secretKey = createHmac('sha256', 'WebAppData').update(botToken).digest();
    const computedHash = createHmac('sha256', secretKey).update(launchParams).digest('hex');

    if (computedHash !== originalHash) {
      throw new UnauthorizedException('Подпись initData не совпадает — данные недостоверны');
    }

    return new Map(decodedPairs);
  }

  private buildAuthResponse(user: { id: string; role: UserRole }) {
    const payload: JwtPayload = { sub: user.id, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
      user: { id: user.id, role: user.role },
    };
  }
}

