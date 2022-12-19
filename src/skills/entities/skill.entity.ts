import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Skill {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created: Date;

  @Index({ unique: true })
  @Column({
    type: 'varchar',
    length: 50,
  })
  name: string;

  @ManyToMany(() => User, (user: User) => user.skills)
  users: User[];
}
