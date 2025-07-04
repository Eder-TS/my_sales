import { Customer } from '@modules/customers/database/entities/Customer';
import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrdersProducts } from './OrdersProducts';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @OneToMany(() => OrdersProducts, orderProduct => orderProduct.order, {
    cascade: true,
  })
  orderProduct: OrdersProducts[];

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
