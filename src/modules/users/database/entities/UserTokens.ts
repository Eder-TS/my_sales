import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('userTokens')
export default class UserTokens {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated('uuid')
  token: string;

  @Column()
  userId: number;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
