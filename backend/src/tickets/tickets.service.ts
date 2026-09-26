import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ticket, TicketCategory, TicketStatus } from './entities/ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { User } from '../users/entities/user.entity';

// Нормативные сроки устранения по категории (часы до дедлайна).
// Вынесено отдельной картой — при масштабировании на другой регион/УК
// достаточно заменить эти значения, не трогая логику расчёта.
// Источник для аварийных категорий — ПП РФ №290; уточнить точные формулировки
// по категориям перед защитой (см. README, раздел "Известные ограничения").
const SLA_HOURS: Record<TicketCategory, number> = {
  [TicketCategory.PLUMBING]: 3,
  [TicketCategory.ELEVATOR]: 3,
  [TicketCategory.ELECTRICS]: 24,
  [TicketCategory.COMMON_AREA]: 24,
  [TicketCategory.OTHER]: 24,
};

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly repo: Repository<Ticket>,
  ) {}

  async create(dto: CreateTicketDto, author: User): Promise<Ticket> {
    const hours = SLA_HOURS[dto.category] ?? 24;
    const slaDeadline = new Date(Date.now() + hours * 60 * 60 * 1000);

    const ticket = this.repo.create({
      ...dto,
      author,
      slaDeadline,
      status: TicketStatus.CREATED,
    });
    return this.repo.save(ticket);
  }

  // Фильтры по дому (для домовой ленты) и по статусу (для очереди диспетчера).
  async findAll(filters: { address?: string; status?: TicketStatus }): Promise<Ticket[]> {
    const qb = this.repo.createQueryBuilder('ticket');

    if (filters.address) {
      qb.andWhere('ticket.address = :address', { address: filters.address });
    }
    if (filters.status) {
      qb.andWhere('ticket.status = :status', { status: filters.status });
    }

    // Просроченные и горящие — наверх очереди диспетчера.
    qb.orderBy('ticket.slaDeadline', 'ASC');
    return qb.getMany();
  }

  async findOne(id: string): Promise<Ticket> {
    const ticket = await this.repo.findOneBy({ id });
    if (!ticket) throw new NotFoundException(`Заявка с ID ${id} не найдена`);
    return ticket;
  }

  async updateStatus(id: string, status: TicketStatus, dispatcher: User): Promise<Ticket> {
    const ticket = await this.findOne(id);
    ticket.status = status;

    // Первое взятие в работу назначает исполнителя; при последующих сменах
    // статуса (COMPLETED/CLOSED) assignee не переопределяем.
    if (status === TicketStatus.IN_PROGRESS && !ticket.assignee) {
      ticket.assignee = dispatcher;
    }

    return this.repo.save(ticket);
    // TODO: здесь же должен триггериться бот-хук уведомления жильцу в чат MAX
    // (даёт платформенный бонус +0.15 балла) — интеграция с MAX Bot API отдельным шагом.
  }

  async upvote(id: string): Promise<Ticket> {
    const ticket = await this.findOne(id);
    ticket.upvotesCount += 1;
    return this.repo.save(ticket);
  }

  async remove(id: string, requester: User): Promise<void> {
    const ticket = await this.findOne(id);

    if (ticket.author.id !== requester.id) {
      throw new ForbiddenException('Удалить заявку может только её автор');
    }
    if (ticket.status !== TicketStatus.CREATED) {
      throw new ForbiddenException('Нельзя удалить заявку, которая уже взята в работу или закрыта');
    }

    await this.repo.remove(ticket);
  }
}

