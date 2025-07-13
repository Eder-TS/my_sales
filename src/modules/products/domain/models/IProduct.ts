import { OrdersProducts } from '@modules/orders/infra/database/entities/OrdersProducts';

export interface IProduct {
  id: number;
  orderProduct: OrdersProducts[];
  name: string;
  price: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}
