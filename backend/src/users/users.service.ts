import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from './entities/user.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';

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

  async updateProfile(userId: string, dto: UpdateProfileDto): Promise<User> {
    const user = await this.findById(userId);
    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }
    Object.assign(user, dto);
    return this.repo.save(user);
  }
}

