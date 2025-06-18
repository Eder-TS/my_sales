import AppError from '@shared/errors/AppError';
import { usersRepositories } from '../database/repositories/UsersRepositories';
import { userTokensRepositories } from '../database/repositories/UserTokensRepositories';
import { sendEmail } from '@config/email';

interface IForgotPassword {
  email: string;
}

export default class SendForgotPasswordEmailService {
  async execute({ email }: IForgotPassword): Promise<void> {
    const user = await usersRepositories.findByEmail(email);

    if (!user) throw new AppError('User not found.', 404);

    const token = await userTokensRepositories.generate(user.id);

    sendEmail({
      to: email,
      subject: 'My Sales Recovery Password',
      body: `
        <body style="margin: 0; padding: 0; background-color: #f4f4f4;">
          <table
            align="center"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="max-width: 600px; background-color: #ffffff; font-family: Arial, sans-serif; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);"
          >
            <tr>
              <td align="center" style="background-color: #4a90e2; padding: 20px 0;">
                <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Verificação de Redefinição de Senha</h1>
              </td>
            </tr>
            <tr>
              <td style="padding: 30px; color: #333333;">
                <p style="font-size: 16px; line-height: 1.5;">Caro ${user.name},</p>
                <p style="font-size: 16px; line-height: 1.5;">
                  Recupere sua senha com este token:
                </p>
                <p
                  style="background-color: #f1f1f1; border: 1px dashed #ccc; padding: 12px; text-align: center; font-size: 18px; letter-spacing: 1px; margin: 20px 0; color: #333333;"
                >
                  <strong>${token?.token}</strong>
                </p>
                <p style="font-size: 14px; color: #666666;">
                  Se você não solicitou essa redefinição, por favor ignore este e-mail.
                </p>
              </td>
            </tr>
            <tr>
              <td align="center" style="background-color: #f4f4f4; padding: 20px; font-size: 12px; color: #999999;">
                © 2025 MySales. Todos os direitos reservados.
              </td>
            </tr>
          </table>
        </body>
      `,
    });
  }
}
