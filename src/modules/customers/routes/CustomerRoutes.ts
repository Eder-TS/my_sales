import { Router } from 'express';
import {
  createCustomerSchema,
  idParamsValidate,
  updateCustomerSchema,
} from '../schemas/CustomerSchema';
import CustomersControllers from '../controllers/CustomersControllers';
import AuthMiddleware from '@shared/middlewares/AuthMiddleware';

const customerRouter = Router();
const customersControllers = new CustomersControllers();

customerRouter.use(AuthMiddleware.execute);

customerRouter.get('/', customersControllers.list);
customerRouter.get('/:id', idParamsValidate, customersControllers.show);
customerRouter.post('/', createCustomerSchema, customersControllers.create);
customerRouter.patch(
  '/:id',
  idParamsValidate,
  updateCustomerSchema,
  customersControllers.update,
);
customerRouter.delete('/:id', idParamsValidate, customersControllers.delete);

export default customerRouter;
