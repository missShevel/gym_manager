import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import User from './user';

@Entity('Roles')
export default class Role {
  @PrimaryColumn()
  public id!: string;

  @Column()
  public name!: string;

  @Column('simple-array')
  public permissions!: string[];

  @OneToMany(() => User, (user) => user.role)
  public users!: User[];
}
