import { Order } from '../entities/Order';
import { AppDataSource } from '@shared/infra/typeorm/data-source';
import { IOrderRepositories } from '@modules/orders/domain/repositories/IOrderRepositories';
import { ICreateOrder } from '@modules/orders/domain/repositories/ICreateOrder';
import { Repository } from 'typeorm';
import { IOrder } from '@modules/orders/domain/models/IOrder';

export default class OrderRepositories implements IOrderRepositories {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Order);
  }

  async findById(id: number): Promise<IOrder | null> {
    const order = await this.ormRepository.findOne({
      where: { id },
      relations: ['orderProduct', 'customer'],
    });

    return order;
  }

  async createOrder({ customer, products }: ICreateOrder): Promise<IOrder> {
    const order = this.ormRepository.create({
      customer,
      orderProduct: products,
    });

    await this.ormRepository.save(order);

    return order;
  }

  async save(order: IOrder): Promise<IOrder> {
    await this.ormRepository.save(order);

    return order;
  }
}
