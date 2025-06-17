import uploadConfig from '@config/upload';
import productsRouter from '@modules/products/routes/ProductRoutes';
import avatarRouter from '@modules/users/routes/AvatarRoutes';
import passwordRouter from '@modules/users/routes/PasswordRoutes';
import sessionRouter from '@modules/users/routes/SessionRoutes';
import userRouter from '@modules/users/routes/UserRoutes';
import express, { Router } from 'express';

const routes = Router();

routes.get('/health', (request, response) => {
  return response.json({ message: 'hello hell, I am well!' });
});

routes.use('/products', productsRouter);
routes.use('/users', userRouter);
routes.use('/sessions', sessionRouter);
routes.use('/avatar', avatarRouter);
routes.use('/password', passwordRouter);

// Fornece rota estática para o frontend usar o avatar sem precisar
// de controllers, services...
routes.use('/files', express.static(uploadConfig.directory));

export default routes;
