import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude, Expose } from 'class-transformer';
import { IUser } from '@modules/users/domain/models/IUser';

@Entity('users')
export class User implements IUser {
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

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) return null;
    return `${process.env.APP_API_URL}/files/${this.avatar}`;
  }
}
