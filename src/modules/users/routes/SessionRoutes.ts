import { Router } from 'express';
import SessionsControllers from '../controllers/SessionsControllers';
import { sessionSchema } from '../schemas/SessionSchemas';

const sessionRouter = Router();
const sessionsControllers = new SessionsControllers();

sessionRouter.post('/login', sessionSchema, sessionsControllers.create);

export default sessionRouter;
