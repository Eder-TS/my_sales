import { Router } from 'express';

const routes = Router();

routes.get('/health', (request, response) => {
  return response.json({ message: 'hello hell, I am well!' });
});

export default routes;
