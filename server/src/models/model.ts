import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
} from 'typeorm';

@Entity()
export default class User {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column()
  public firstName!: string;

  @Column()
  public lastName!: string;

  @Column()
  public userName!: string;

  @Column()
  public email!: string;

  @CreateDateColumn({ name: 'createdAt' }) 'createdAt': Date;

  @UpdateDateColumn({ name: 'updatedAt' }) 'updatedAt': Date;
}
