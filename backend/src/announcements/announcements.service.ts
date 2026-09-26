import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Announcement } from './entities/announcement.entity';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';

@Injectable()
export class AnnouncementsService {
  constructor(
    @InjectRepository(Announcement)
    private readonly repo: Repository<Announcement>,
  ) {}

  async findAll(): Promise<Announcement[]> {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }

  async create(dto: CreateAnnouncementDto): Promise<Announcement> {
    const announcement = this.repo.create(dto);
    return this.repo.save(announcement);
  }

  async remove(id: string): Promise<void> {
    const announcement = await this.repo.findOneBy({ id });
    if (!announcement) {
      throw new NotFoundException(`Объявление с ID ${id} не найдено`);
    }
    await this.repo.remove(announcement);
  }
}

