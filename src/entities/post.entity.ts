import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Post {
  @PrimaryColumn({ length: 45 })
  id: string;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 1000 })
  content: string;

  @Column({ name: 'user_id', length: 45 })
  userId: string;

  @Column()
  date: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ManyToOne((type) => User, (user) => user.id, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
