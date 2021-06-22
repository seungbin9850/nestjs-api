import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Post } from './post.entity';

@Entity()
export class User {
  @PrimaryColumn({ length: 45 })
  id: string;

  @Column({ name: 'user_id', length: 12, unique: true })
  userId: string;

  @Column({ length: 80 })
  password: string;

  @OneToMany((type) => Post, (post) => post.user)
  posts!: Post[];
}
