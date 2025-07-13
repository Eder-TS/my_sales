import { Customer } from '@modules/customers/infra/database/entities/Customer';
import { OrdersProducts } from '@modules/orders/infra/database/entities/OrdersProducts';

export interface IOrder {
  id: number;
  customer: Customer;
  orderProduct: OrdersProducts[];
  createdAt: Date;
  updatedAt: Date;
}
