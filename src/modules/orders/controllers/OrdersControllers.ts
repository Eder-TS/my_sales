import { Request, Response } from 'express';
import ShowOrderService from '../services/ShowOrderService';
import CreateOrderService from '../services/CreateOrderService';

export default class OrdersControllers {
  async show(request: Request, response: Response): Promise<Response> {
    const showOrder = new ShowOrderService();
    const { id } = request.params;

    const order = await showOrder.execute(id);

    return response.json(order);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const createOrder = new CreateOrderService();
    const { customerId, products } = request.body;

    const order = await createOrder.execute({ customerId, products });

    return response.json(order);
  }
}
