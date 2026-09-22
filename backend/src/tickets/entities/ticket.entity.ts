import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum TicketCategory {
  LEAK = 'LEAK',
  ELEVATOR = 'ELEVATOR',
  ELECTRIC = 'ELECTRIC',
  OTHER = 'OTHER',
}

export enum TicketStatus {
  NEW = 'NEW',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
}

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
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
    default: TicketStatus.NEW,
  })
  status: TicketStatus;

  @Column({ nullable: true })
  photoUrl: string;

  @Column()
  address: string;

  @Column({ default: 1 })
  entrance: number;

  @Column({ default: 0 })
  upvotes: number;

  @CreateDateColumn()
  createdAt: Date;
}

