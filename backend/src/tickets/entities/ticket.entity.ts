import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

export enum RequestCategory {
  LEAK = 'leak',
  ELEVATOR = 'elevator',
  ELECTRICITY = 'electricity',
  HEATING = 'heating',
  OTHER = 'other',
}

export enum RequestStatus {
  REGISTERED = 'registered',
  IN_PROGRESS = 'in_progress',
  CLOSED = 'closed',
}

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: RequestCategory,
    default: RequestCategory.OTHER,
  })
  category: RequestCategory;

  @Column('text')
  description: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column({ type: 'text', nullable: true })
  photoDataUrl?: string;

  @Column({
    type: 'enum',
    enum: RequestStatus,
    default: RequestStatus.REGISTERED,
  })
  status: RequestStatus;

  @Column({ type: 'int', default: 24 })
  resolutionHours: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;
}

