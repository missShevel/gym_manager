import { UserSex, UserStatus } from 'absctracts/user';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import File from './file';
import User from './user';

@Entity('Clients')
export default class Client {
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

  @Column({
    type: 'enum',
    enum: UserSex,
    nullable: false,
    default: UserSex.MALE,
  })
  public sex!: UserSex;

  @Column({
    type: 'enum',
    enum: UserStatus,
    nullable: false,
    default: UserStatus.BEGGINER,
  })
  public status!: UserStatus;

  @Column({
    type: 'text',
    nullable: false,
    default: '',
  })
  public details!: string;

  // Relations
  @OneToOne(() => File, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn({ name: 'avatar' })
  avatar!: File | null;

  @ManyToOne(() => User, (trainer) => trainer.clients, { nullable: true })
  public trainer!: User | null;

  // Auto-generated dates
  @CreateDateColumn({ name: 'createdAt' }) 'createdAt': Date;

  @UpdateDateColumn({ name: 'updatedAt' }) 'updatedAt': Date;
}
