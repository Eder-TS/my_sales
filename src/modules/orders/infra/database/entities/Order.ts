import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OrdersProducts } from './OrdersProducts';
import { Customer } from '@modules/customers/infra/database/entities/Customer';
import { IOrder } from '@modules/orders/domain/models/IOrder';

@Entity('orders')
export class Order implements IOrder {
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
