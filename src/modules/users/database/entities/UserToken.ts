import {
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('userToken')
export default class UserToken {
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
