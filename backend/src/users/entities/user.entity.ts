import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm';
import { Ticket } from '../../tickets/entities/ticket.entity';

export enum UserRole {
  RESIDENT = 'RESIDENT',
  DISPATCHER = 'DISPATCHER',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // ID пользователя в MAX (из initData WebApp). Уникален — один MAX-аккаунт = один User.
  @Column({ unique: true })
  maxUserId: string;

  @Column()
  fullName: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.RESIDENT,
  })
  role: UserRole;

  // На MVP адрес не привязан к реальному ФИАС — тестовое значение по умолчанию,
  // явно помечено как заглушка до реальной интеграции (см. README, раздел "Ограничения").
  @Column({ default: 'г. Москва, ул. Ленина, д. 10' })
  address: string;

  @Column({ nullable: true })
  apartment: number;

  @OneToMany(() => Ticket, (ticket) => ticket.author)
  tickets: Ticket[];

  @CreateDateColumn()
  createdAt: Date;
}

