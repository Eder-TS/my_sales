import AppError from '@shared/errors/AppError';
import { IOrderRepositories } from '../domain/repositories/IOrderRepositories';
import { IOrder } from '../domain/models/IOrder';

export default class ShowOrderService {
  constructor(private readonly orderRepositories: IOrderRepositories) {}
  async execute(id: string): Promise<IOrder> {
    const idToFind = Number(id);

    const order = await this.orderRepositories.findById(idToFind);

    if (!order) throw new AppError('Order not found.');

    return order;
  }
}
