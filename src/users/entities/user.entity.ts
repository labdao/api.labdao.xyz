import { Project } from 'src/projects/entities/project.entity';
import { Skill } from 'src/skills/entities/skill.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'first_name',
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'last_name',
    nullable: true,
  })
  lastName: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  role: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  affiliation: string;

  @Column({
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  city: string;

  @Column({
    type: 'varchar',
    length: 50,
    name: 'wallet_address',
  })
  @Index({ unique: true })
  walletAddress: string;

  @Column({
    type: 'varchar',
    length: 100,
    name: 'avatar_url',
  })
  avatarUrl: string;

  @OneToMany(
    () => Project,
    (project) => project.user,
    { eager: true }
  )
  projects: Project[];

  @ManyToMany(
    () => Skill,
    (skill: Skill) => skill.users,
    { eager: true}
  )
  @JoinTable({
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'skill_id' }
  })
  skills: Skill[];
}
