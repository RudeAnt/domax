import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketStatusDto } from './dto/update-ticket-status.dto';
import { TicketStatus } from './entities/ticket.entity';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User, UserRole } from '../users/entities/user.entity';

@ApiTags('Tickets')
@ApiBearerAuth()
@UseGuards(RolesGuard)
@Controller('tickets')
export class TicketsController {
  constructor(private readonly service: TicketsService) {}

  @Post()
  @Roles(UserRole.RESIDENT)
  @ApiOperation({ summary: 'Создать заявку' })
  create(@Body() dto: CreateTicketDto, @CurrentUser() author: User) {
    return this.service.create(dto, author);
  }

  @Get()
  @Roles(UserRole.RESIDENT, UserRole.DISPATCHER)
  @ApiOperation({ summary: 'Получить список заявок (лента дома / очередь диспетчера)' })
  findAll(@Query('address') address?: string, @Query('status') status?: TicketStatus) {
    return this.service.findAll({ address, status });
  }

  @Get(':id')
  @Roles(UserRole.RESIDENT, UserRole.DISPATCHER)
  @ApiOperation({ summary: 'Получить заявку по ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id/status')
  @Roles(UserRole.DISPATCHER)
  @ApiOperation({ summary: 'Изменить статус заявки (в работу / закрыть)' })
  updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateTicketStatusDto,
    @CurrentUser() dispatcher: User,
  ) {
    return this.service.updateStatus(id, dto.status, dispatcher);
  }

  @Post(':id/upvote')
  @Roles(UserRole.RESIDENT)
  @ApiOperation({ summary: '«У меня так же» — отметить дублирующуюся проблему' })
  upvote(@Param('id') id: string) {
    return this.service.upvote(id);
  }

  @Delete(':id')
  @Roles(UserRole.RESIDENT)
  @HttpCode(204)
  @ApiOperation({ summary: 'Удалить свою заявку (только пока статус CREATED)' })
  remove(@Param('id') id: string, @CurrentUser() user: User) {
    return this.service.remove(id, user);
  }
}

