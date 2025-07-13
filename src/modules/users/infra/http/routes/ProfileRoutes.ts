import { Router } from 'express';
import ProfileControllers from '../controllers/ProfileControllers';
import { UpdateProfileSchema } from '../schemas/UpdateProfileSchema';
import AuthMiddleware from '@shared/middlewares/AuthMiddleware';

const profileRouter = Router();
const profileControllers = new ProfileControllers();

profileRouter.use(AuthMiddleware.execute);
profileRouter.get('/', profileControllers.show);
profileRouter.patch('/', UpdateProfileSchema, profileControllers.update);

export default profileRouter;
