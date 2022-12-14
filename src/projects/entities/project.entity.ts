import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { User } from 'src/users/entities/user.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @ManyToOne(() => User, (user) => user.projects, {
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({
    type: 'varchar',
    length: 100,
  })
  name: string;

  @Column({ type: 'text' })
  goal: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  summary?: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  website?: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  skills?: string;

  @Column({
    type: 'int',
    name: 'number_of_members',
  })
  numberOfMembers: number;

  @Column({
    type: 'text',
    nullable: true,
  })
  funding?: string;

  @Column({
    type: 'text',
    nullable: true,
    name: 'help_needed',
  })
  helpNeeded?: string;
}
