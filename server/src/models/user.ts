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

  @Column()
  public firstName!: string;

  @Column()
  public lastName!: string;

  @Index({ unique: true })
  @Column()
  public email!: string;

  @Column({
    type: 'enum',
    enum: UserSex,
    default: UserSex.MALE,
  })
  public sex!: UserSex;

  @Column()
  public passwordHash!: string;

  // Relations
  @OneToOne(() => File)
  @JoinColumn({ name: 'avatar' })
  avatar!: File;

  @OneToMany(() => Client, (client) => client.trainer)
  public clients!: Client[];

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn()
  role!: Role;

  @OneToMany(() => Session, (session) => session.user)
  public sessions!: Session[];

  @OneToMany(() => Schedule, (schedule) => schedule.trainer)
  public schedules!: Schedule[];

  // Auto-generated dates
  @CreateDateColumn({ name: 'createdAt' }) 'createdAt': Date;

  @UpdateDateColumn({ name: 'updatedAt' }) 'updatedAt': Date;
}
