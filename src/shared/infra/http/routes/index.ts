import uploadConfig from '@config/upload';
import customerRouter from '@modules/customers/infra/http/routes/CustomerRoutes';
import ordersRouter from '@modules/orders/infra/http/routes/OrdersRoutes';
import productsRouter from '@modules/products/infra/http/routes/ProductRoutes';
import avatarRouter from '@modules/users/infra/http/routes/AvatarRoutes';
import passwordRouter from '@modules/users/infra/http/routes/PasswordRoutes';
import profileRouter from '@modules/users/infra/http/routes/ProfileRoutes';
import sessionRouter from '@modules/users/infra/http/routes/SessionRoutes';
import userRouter from '@modules/users/infra/http/routes/UserRoutes';
import express, { Router } from 'express';

const routes = Router();

routes.get('/health', (request, response) => {
  return response.json({ message: 'hello hell, I am well!' });
});

routes.use('/products', productsRouter);
routes.use('/users', userRouter);
routes.use('/sessions', sessionRouter);

// Para fazer upload de um avatar para teste da ferramenta usar o
// Postman pois o ThunderClient requer versão paga para esta função.
routes.use('/avatar', avatarRouter);
routes.use('/passwords', passwordRouter);
routes.use('/profiles', profileRouter);
routes.use('/customers', customerRouter);
routes.use('/orders', ordersRouter);

// Fornece rota estática para o frontend usar o avatar sem precisar
// de controllers, services...
routes.use('/files', express.static(uploadConfig.directory));

export default routes;
