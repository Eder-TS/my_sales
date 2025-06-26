import { Product } from '@modules/products/database/entities/Product';
import { orderRepositories } from '../database/repositories/OrderRepositories';

interface ICreateOrder {
  customerId: number;
  products: Product[];
}

export default class CreateOrderService {
  async execute({ customerId, products }: ICreateOrder): Promise<Order> {
    const customer = await orderRepositories.findById(customerId);
    const order = orderRepositories.create({ customer, products });
  }
}
