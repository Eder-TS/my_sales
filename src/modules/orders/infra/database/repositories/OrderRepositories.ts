import { Customer } from '@modules/customers/infra/database/entities/Customer';
import { Order } from '../entities/Order';
import { AppDataSource } from '@shared/infra/typeorm/data-source';

interface ICreateOrder {
  customer: Customer;
  products: ICreateOrderProducts[];
}

interface ICreateOrderProducts {
  productId: number;
  quantity: number;
  price: number;
}

export const orderRepositories = AppDataSource.getRepository(Order).extend({
  async findById(id: number): Promise<Order | null> {
    const order = await this.findOne({
      where: { id },
      relations: ['orderProduct', 'customer'],
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
