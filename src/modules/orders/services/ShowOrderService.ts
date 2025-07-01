import AppError from '@shared/errors/AppError';
import { Order } from '../database/entities/Order';
import { orderRepositories } from '../database/repositories/OrderRepositories';

export default class ShowOrderService {
  async execute(id: string): Promise<Order> {
    const idToFind = Number(id);

    const order = await orderRepositories.findById(idToFind);

    if (!order) throw new AppError('Order not found.');

    return order;
  }
}
