import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn({ name: 'user_id', length: 12, unique: true })
  userId: string;

  @Column({ length: 80 })
  password: string;
}
