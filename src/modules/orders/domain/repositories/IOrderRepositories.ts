import { IOrder } from '../models/IOrder';
import { ICreateOrder } from './ICreateOrder';

export interface IOrderRepositories {
  findById(id: number): Promise<IOrder | null>;
  createOrder(data: ICreateOrder): Promise<IOrder>;
}
