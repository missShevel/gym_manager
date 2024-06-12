import { ScheduleType } from 'absctracts/schedule';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import User from './user';

@Entity('Schedules')
export default class Schedule {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
  })
  public name!: string;

  @Column({
    type: 'date',
    nullable: false,
  })
  public startDate!: Date;

  @Column({
    type: 'time',
    nullable: true,
  })
  public startTime!: string | null;

  @Column({
    type: 'date',
    nullable: true,
  })
  public endDate!: Date | null;

  @Column({
    type: 'time',
    nullable: true,
  })
  public endTime!: string | null;

  @Column({
    type: 'bool',
    default: false,
    nullable: false,
  })
  public isAllDay!: boolean;

  @Column({
    type: 'text',
    default: '',
    nullable: false,
  })
  public details!: string;

  @Column({
    type: 'enum',
    enum: ScheduleType,
    default: ScheduleType.ONE_TIME,
  })
  public type!: ScheduleType;

  @Column({
    type: 'integer',
    default: 0,
    nullable: false,
  })
  public interval!: number;

  // Relations
  @ManyToOne(() => User, (user) => user.schedules, { nullable: true })
  public trainer!: User | null;

  // Auto-generated dates
  @CreateDateColumn({ name: 'createdAt' }) 'createdAt': Date;

  @UpdateDateColumn({ name: 'updatedAt' }) 'updatedAt': Date;
}
