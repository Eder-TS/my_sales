import AppError from '@shared/errors/AppError';
import { usersRepositories } from '../infra/database/repositories/UsersRepositories';
import { compare } from 'bcrypt';
import { Secret, sign } from 'jsonwebtoken';
import { ISessionUser } from '../domain/models/ISessionUser';
import { ISessionResponse } from '../domain/models/ISessionResponse';

export default class SessionUserService {
  async execute({ email, password }: ISessionUser): Promise<ISessionResponse> {
    const user = await usersRepositories.findByEmail(email);
    if (!user) throw new AppError('Invalid credentials.', 401);

    const passwordConfirmed = await compare(password, user.password);
    if (!passwordConfirmed) throw new AppError('Invalid credentials.', 401);

    const token = sign({}, process.env.APP_SECRET as Secret, {
      subject: String(user.id),
      expiresIn: '1d',
    });

    return { user, token };
  }
}
