import { Request, Response } from 'express';
import ResetPasswordService from '../../../services/ResetPasswordService';
import { container } from 'tsyringe';

export default class ResetPasswordController {
  async create(request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body;

    const resetPassword = container.resolve(ResetPasswordService);

    await resetPassword.execute({ token, password });

    return response.sendStatus(204);
  }
}
