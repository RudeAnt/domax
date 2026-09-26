import { Controller, Get, Post, Delete, Body, Param, UseGuards, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { AnnouncementsService } from './announcements.service';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';

@ApiTags('Announcements')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller('announcements')
export class AnnouncementsController {
  constructor(private readonly service: AnnouncementsService) {}

  @Get()
  @ApiOperation({ summary: 'Список объявлений УК для баннера на главной' })
  findAll() {
    return this.service.findAll();
  }

  @Post()
  @Roles(UserRole.DISPATCHER)
  @ApiOperation({ summary: 'Создать объявление (УК/диспетчер)' })
  create(@Body() dto: CreateAnnouncementDto) {
    return this.service.create(dto);
  }

  @Delete(':id')
  @Roles(UserRole.DISPATCHER)
  @HttpCode(204)
  @ApiOperation({ summary: 'Удалить объявление (УК/диспетчер)' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}

