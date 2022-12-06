import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('Files')
export default class File {
  @PrimaryGeneratedColumn('uuid')
  public id!: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  public name!: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  public extention!: string;

  @Column({
    default: 'local',
    nullable: false,
  })
  public location!: string;

  // Auto-generated dates
  @CreateDateColumn({ name: 'createdAt' }) 'createdAt': Date;

  @UpdateDateColumn({ name: 'updatedAt' }) 'updatedAt': Date;
}
