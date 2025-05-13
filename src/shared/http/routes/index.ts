import productsRouter from '@modules/products/routes/ProductRoutes';
import { Router } from 'express';

const routes = Router();

routes.get('/health', (request, response) => {
  return response.json({ message: 'hello hell, I am well!' });
});

routes.use('/products', productsRouter);

export default routes;
