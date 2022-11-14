import { ScheduleType } from 'absctracts/schedule';
import {
  Entity, Column, CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, ManyToOne,
} from 'typeorm';
import User from './user';

@Entity('Schedules')
export default class Schedule {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column()
  public name!: string;

  @Column('date')
  public startDate!: Date;

  @Column('time')
  public startTime!: string;

  @Column({
    type: 'date',
    nullable: true,
  })
  public endDate!: Date;

  @Column({
    type: 'time',
    nullable: true,
  })
  public endTime!: string;

  @Column('bool')
  public isAllDay!: boolean;

  @Column('text')
  public details!: string;

  @Column({
    type: 'enum',
    enum: ScheduleType,
    default: ScheduleType.ONE_TIME,
  })
  public type!: ScheduleType;

  @Column('integer')
  public interval!: number;

  // Relations
  @ManyToOne(() => User, (user) => user.schedules)
  public trainer!: User;

  // Auto-generated dates
  @CreateDateColumn({ name: 'createdAt' }) 'createdAt': Date;

  @UpdateDateColumn({ name: 'updatedAt' }) 'updatedAt': Date;
}
