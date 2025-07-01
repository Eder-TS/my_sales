import { Router } from 'express';
import OrdersControllers from '../controllers/OrdersControllers';
import {
  createOrderValidate,
  idParamsValidate,
} from '../schemas/OrdersSchemas';
import AuthMiddleware from '@shared/middlewares/AuthMiddleware';

const ordersRouter = Router();
const ordersControllers = new OrdersControllers();

ordersRouter.use(AuthMiddleware.execute);
ordersRouter.get('/:id', idParamsValidate, ordersControllers.show);
ordersRouter.post('/', createOrderValidate, ordersControllers.create);

export default ordersRouter;
