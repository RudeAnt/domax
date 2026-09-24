import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

export enum TicketCategory {
  PLUMBING = 'PLUMBING', // сантехника / протечка
  ELECTRICS = 'ELECTRICS', // электрика / свет
  ELEVATOR = 'ELEVATOR', // лифт
  COMMON_AREA = 'COMMON_AREA', // подъезд / двор
  OTHER = 'OTHER',
}

export enum TicketStatus {
  CREATED = 'CREATED', // зарегистрировано
  IN_PROGRESS = 'IN_PROGRESS', // в работе у диспетчера/мастера
  COMPLETED = 'COMPLETED', // выполнено, ждёт подтверждения
  CLOSED = 'CLOSED', // закрыто
}

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'enum',
    enum: TicketCategory,
    default: TicketCategory.OTHER,
  })
  category: TicketCategory;

  @Column({
    type: 'enum',
    enum: TicketStatus,
    default: TicketStatus.CREATED,
  })
  status: TicketStatus;

  @Column()
  address: string;

  @Column({ nullable: true })
  apartment: number;

  @Column({ nullable: true })
  photoUrl: string;

  // Нормативный дедлайн устранения — конкретный момент времени, а не число часов,
  // чтобы фронт мог считать обратный отсчёт и подсвечивать просрочку напрямую.
  @Column({ type: 'timestamptz' })
  slaDeadline: Date;

  // Счётчик «У меня так же» — снижает дублирование заявок по одному дому/проблеме.
  @Column({ default: 0 })
  upvotesCount: number;

  @ManyToOne(() => User, (user) => user.tickets, { eager: true, onDelete: 'CASCADE' })
  author: User;

  @ManyToOne(() => User, { nullable: true, eager: true })
  assignee: User | null;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;
}

