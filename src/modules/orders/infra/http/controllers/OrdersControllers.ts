import CreateOrderService from '@modules/orders/services/CreateOrderService';
import ShowOrderService from '@modules/orders/services/ShowOrderService';
import { Request, RequestHandler, Response } from 'express';
import { container } from 'tsyringe';

export default class OrdersControllers {
  public show: RequestHandler = async (
    request: Request,
    response: Response,
  ): Promise<void> => {
    const showOrder = container.resolve(ShowOrderService);
    const { id } = request.params;

    const order = await showOrder.execute(id);

    response.json(order);
  };

  public create: RequestHandler = async (
    request: Request,
    response: Response,
  ): Promise<void> => {
    const createOrder = container.resolve(CreateOrderService);
    const { customerId, products } = request.body;

    const order = await createOrder.execute({ customerId, products });

    response.json(order);
  };
}
