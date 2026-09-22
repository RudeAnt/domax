import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket, RequestCategory, RequestStatus } from './entities/ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';

const SLA_HOURS: Record<RequestCategory, number> = {
  [RequestCategory.LEAK]: 72,
  [RequestCategory.ELEVATOR]: 24,
  [RequestCategory.ELECTRICITY]: 24,
  [RequestCategory.HEATING]: 24,
  [RequestCategory.OTHER]: 240,
};

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly repo: Repository<Ticket>,
  ) {}

  async create(dto: CreateTicketDto): Promise<Ticket> {
    const resolutionHours = SLA_HOURS[dto.category] ?? 240;
    const ticket = this.repo.create({
      ...dto,
      status: RequestStatus.REGISTERED,
      resolutionHours,
    });
    return this.repo.save(ticket);
  }

  async findAll(): Promise<Ticket[]> {
    return this.repo.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Ticket> {
    const ticket = await this.repo.findOneBy({ id });
    if (!ticket) throw new NotFoundException(`Ticket with ID ${id} not found`);
    return ticket;
  }
}

