import { AppDataSource } from '@shared/typeorm/data-source';
import { Order } from '../entities/Order';
import { Customer } from '@modules/customers/database/entities/Customer';
import { Product } from '@modules/products/database/entities/Product';

interface ICreateOrder {
  customer: Customer;
  products: Product[];
}

export const orderRepositories = AppDataSource.getRepository(Order).extend({
  async findById(id: number): Promise<Order | null> {
    const order = await this.findOne({
      where: { id },
      relations: ['orderProducts', 'customer'],
    });

    return order;
  },

  async createOrder({ customer, products }: ICreateOrder): Promise<Order> {
    const order = this.create({
      customer,
      orderProduct: products,
    });

    await this.save(order);

    return order;
  },
});
