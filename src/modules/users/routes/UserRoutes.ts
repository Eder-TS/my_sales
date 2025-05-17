import { Router } from 'express';
import UsersControllers from '../controllers/UsersControllers';
import { createUserSchema } from '../schemas/UserSchemas';

const userRouter = Router();
const usersControllers = new UsersControllers();

userRouter.get('/', usersControllers.list);

userRouter.post('/', createUserSchema, usersControllers.create);

export default userRouter;
