import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';

@ApiTags('Tickets')
@Controller('tickets')
export class TicketsController {
  constructor(private readonly service: TicketsService) {}

  @Post()
  @ApiOperation({ summary: 'Создать заявку' })
  create(@Body() dto: CreateTicketDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список всех заявок' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить заявку по ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }
}

