import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import User from './user';

@Entity('Roles')
export default class Role {
  @PrimaryColumn()
  public id!: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  public name!: string;

  @Column('simple-array')
  public permissions!: string[];

  @OneToMany(() => User, (user) => user.role, {
    cascade: true,
  })
  public users!: User[];
}
