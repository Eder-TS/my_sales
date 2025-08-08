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
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @OneToMany(() => OrdersProducts, orderProduct => orderProduct.order, {
    cascade: true,
  })
  orderProduct: OrdersProducts[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @CreateDateColumn({ name: 'update_at' })
  updatedAt: Date;
}
