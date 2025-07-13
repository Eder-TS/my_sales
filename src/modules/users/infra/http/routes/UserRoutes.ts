import { Router } from 'express';
import UsersControllers from '../controllers/UsersControllers';
import { createUserSchema } from '../schemas/UserSchemas';
import AuthMiddleware from '@shared/middlewares/AuthMiddleware';

const userRouter = Router();
const usersControllers = new UsersControllers();

userRouter.get('/', AuthMiddleware.execute, usersControllers.list);

userRouter.post('/', createUserSchema, usersControllers.create);

export default userRouter;
