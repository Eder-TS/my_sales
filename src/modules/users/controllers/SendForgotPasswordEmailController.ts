import { Request, Response } from 'express';
import SendForgotPasswordEmailService from '../services/SendForgotPasswordEmailService';

export default class SendForgotPasswordEmailController {
  async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPasswordEmailService = new SendForgotPasswordEmailService();

    await sendForgotPasswordEmailService.execute({ email });

    // sendStatus() é um método mais completo e não necessita do método
    // json(). O uso de json() causa uma tentativa de resposta duplicada.
    return response.sendStatus(204);
  }
}
