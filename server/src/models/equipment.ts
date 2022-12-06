import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import File from './file';

@Entity('Equipments')
export default class Equipment {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
  })
  public name!: string;

  @Column({
    type: 'integer',
    default: 0,
    nullable: false,
  })
  public count!: number;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  public link!: string | null;

  // Relations
  @OneToOne(() => File, {
    nullable: true,
    cascade: true,
  })
  @JoinColumn({ name: 'avatar' })
  avatar!: File | null;

  // Auto-generated dates
  @CreateDateColumn({ name: 'createdAt' }) 'createdAt': Date;

  @UpdateDateColumn({ name: 'updatedAt' }) 'updatedAt': Date;
}
