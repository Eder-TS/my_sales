import AppError from '@shared/errors/AppError';
import { Order } from '../infra/database/entities/Order';
import { IOrderRepositories } from '../domain/repositories/IOrderRepositories';

export default class ShowOrderService {
  constructor(private readonly orderRepositories: IOrderRepositories) {}
  async execute(id: string): Promise<Order> {
    const idToFind = Number(id);

    const order = await this.orderRepositories.findById(idToFind);

    if (!order) throw new AppError('Order not found.');

    return order;
  }
}
