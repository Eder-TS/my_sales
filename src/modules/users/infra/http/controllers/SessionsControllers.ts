import { Request, RequestHandler, Response } from 'express';
import SessionUserService from '../../../services/SessionUserService';
import { container } from 'tsyringe';

export default class SessionsControllers {
  public create: RequestHandler = async (
    request: Request,
    response: Response,
  ): Promise<void> => {
    const { email, password } = request.body;

    const createSession = container.resolve(SessionUserService);

    const userToken = await createSession.execute({ email, password });

    response.json(userToken);
  };
}
