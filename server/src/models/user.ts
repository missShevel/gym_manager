import { UserSex } from 'absctracts/user';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  OneToOne,
  JoinColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import Client from './client';
import File from './file';
import Role from './role';
import Schedule from './schedule';
import Session from './session';

@Entity('Users')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  public firstName!: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  public lastName!: string;

  @Index({ unique: true })
  @Column({
    type: 'varchar',
    nullable: false,
  })
  public email!: string;

  @Column({
    type: 'enum',
    enum: UserSex,
    default: UserSex.MALE,
  })
  public sex!: UserSex;

  @Column({
    type: 'varchar',
    length: 150,
    nullable: false,
  })
  public passwordHash!: string;

  // Relations
  @OneToOne(() => File, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn({ name: 'avatar' })
  avatar!: File | null;

  @OneToMany(() => Client, (client) => client.trainer)
  public clients!: Client[];

  @ManyToOne(() => Role, (role) => role.users, { nullable: false })
  @JoinColumn()
  role!: Role;

  @OneToMany(() => Session, (session) => session.user, {
    cascade: true,
  })
  public sessions!: Session[];

  @OneToMany(() => Schedule, (schedule) => schedule.trainer, {
    cascade: true,
  })
  public schedules!: Schedule[];

  // Auto-generated dates
  @CreateDateColumn({ name: 'createdAt' }) 'createdAt': Date;

  @UpdateDateColumn({ name: 'updatedAt' }) 'updatedAt': Date;
}
