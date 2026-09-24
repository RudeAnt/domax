import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repo: Repository<User>,
  ) {}

  async findById(id: string): Promise<User | null> {
    return this.repo.findOneBy({ id });
  }

  async findByMaxId(maxUserId: string): Promise<User | null> {
    return this.repo.findOneBy({ maxUserId });
  }

  // Используется реальным MAX-логином (POST /api/auth/max): если пользователь
  // с этим maxUserId уже есть — возвращаем его, иначе создаём с ролью RESIDENT по умолчанию.
  async findOrCreateByMaxId(maxUserId: string, fullName: string): Promise<User> {
    const existing = await this.findByMaxId(maxUserId);
    if (existing) return existing;

    const user = this.repo.create({
      maxUserId,
      fullName,
      role: UserRole.RESIDENT,
    });
    return this.repo.save(user);
  }

  // Используется dev-login: создаёт (или переиспользует) синтетического пользователя
  // с заданной ролью — без прохождения реальной авторизации MAX. Нужен только жюри/тестам.
  async findOrCreateDevUser(role: UserRole, maxUserId?: string): Promise<User> {
    const devMaxId = maxUserId ?? `dev-${role.toLowerCase()}`;
    const existing = await this.findByMaxId(devMaxId);
    if (existing) return existing;

    const user = this.repo.create({
      maxUserId: devMaxId,
      fullName: role === UserRole.RESIDENT ? 'Тестовый житель' : 'Тестовый диспетчер',
      role,
    });
    return this.repo.save(user);
  }
}

