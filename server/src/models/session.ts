import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn,
} from 'typeorm';
import User from './user';

@Entity('Sessions')
export default class Session {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column('json')
  public data!: object;

  // Relations
  @ManyToOne(() => User, (user) => user.sessions)
  @JoinColumn({ name: 'userId' })
  public user!: User;

  // Auto-generated dates
  @CreateDateColumn({ name: 'createdAt' }) 'createdAt': Date;

  @UpdateDateColumn({ name: 'updatedAt' }) 'updatedAt': Date;
}
