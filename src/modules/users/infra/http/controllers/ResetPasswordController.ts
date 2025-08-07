import { Request, RequestHandler, Response } from 'express';
import ResetPasswordService from '../../../services/ResetPasswordService';
import { container } from 'tsyringe';

export default class ResetPasswordController {
  public create: RequestHandler = async (
    request: Request,
    response: Response,
  ): Promise<void> => {
    const { token, password } = request.body;

    const resetPassword = container.resolve(ResetPasswordService);

    await resetPassword.execute({ token, password });

    response.sendStatus(204);
  };
}
