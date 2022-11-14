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

  @Column()
  public firstName!: string;

  @Column()
  public lastName!: string;

  @Column({
    type: 'enum',
    enum: UserSex,
    default: UserSex.MALE,
  })
  public sex!: UserSex;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.BEGGINER,
  })
  public status!: UserStatus;

  @Column({
    type: 'text',
    default: '',
  })
  public details!: string;

  // Relations
  @OneToOne(() => File)
  @JoinColumn({ name: 'avatar' })
    avatar!: File;

  @ManyToOne(() => User, (trainer) => trainer.clients)
  public trainer!: User;

  // Auto-generated dates
  @CreateDateColumn({ name: 'createdAt' }) 'createdAt': Date;

  @UpdateDateColumn({ name: 'updatedAt' }) 'updatedAt': Date;
}
