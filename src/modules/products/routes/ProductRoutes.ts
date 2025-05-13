import { Router } from 'express';
import ProductsControllers from '../controllers/ProductsControllers';

const productsRouter = Router();
const productsControllers = new ProductsControllers();

productsRouter.get('/', productsControllers.list);

productsRouter.get('/:id', productsControllers.show);

productsRouter.post('/', productsControllers.create);

productsRouter.put('/:id', productsControllers.update);

productsRouter.delete('/:id', productsControllers.delete);

export default productsRouter;
