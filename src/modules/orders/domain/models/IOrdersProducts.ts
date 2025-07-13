import { Order } from '@modules/orders/infra/database/entities/Order';
import { Product } from '@modules/products/infra/database/entities/Product';

export interface IOrdersProducts {
  id: number;
  order: Order;
  orderId: number;
  product: Product;
  productId: number;
  price: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
}
