import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  email: string;

  // Usando a biblioteca class-transformer para que as senhas salvas no banco
  // de dados não sejam mostradas nas buscas, também é preciso implementar no método
  // que deseja proteger.
  @Column({ type: 'text' })
  @Exclude()
  password: string;

  @Column({ type: 'text' })
  avatar: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
