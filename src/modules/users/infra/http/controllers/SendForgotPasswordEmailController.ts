import { Request, RequestHandler, Response } from 'express';
import SendForgotPasswordEmailService from '../../../services/SendForgotPasswordEmailService';
import { container } from 'tsyringe';

export default class SendForgotPasswordEmailController {
  public create: RequestHandler = async (
    request: Request,
    response: Response,
  ): Promise<void> => {
    const { email } = request.body;

    const sendForgotPasswordEmailService = container.resolve(
      SendForgotPasswordEmailService,
    );

    await sendForgotPasswordEmailService.execute({ email });

    // sendStatus() é um método mais completo e não necessita do método
    // json(). O uso de json() causa uma tentativa de resposta duplicada.
    response.sendStatus(204);
  };
}
