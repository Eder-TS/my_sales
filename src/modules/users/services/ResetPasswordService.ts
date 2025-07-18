import AppError from '@shared/errors/AppError';
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcrypt';
import { IUsersRepositories } from '../domain/repositories/IUsersRepositories';
import { IUserTokensRepositories } from '../domain/repositories/IUserTokensRepositories';

interface IResetPassword {
  token: string;
  password: string;
}

export default class ResetPasswordService {
  constructor(
    private readonly usersRepositories: IUsersRepositories,
    private readonly userTokensRepositories: IUserTokensRepositories,
  ) {}
  async execute({ token, password }: IResetPassword): Promise<void> {
    const userToken = await this.userTokensRepositories.findByToken(token);
    if (!userToken) throw new AppError('User token not exists.', 404);

    const user = await this.usersRepositories.findById(userToken.userId);
    if (!user) throw new AppError('User not exists.', 404);

    const tokenCreatedAt = userToken.createdAt;
    const compareDate = addHours(tokenCreatedAt, 2);
    if (isAfter(Date.now(), compareDate))
      throw new AppError('Token expired.', 401);

    user.password = await hash(password, 10);
    await this.usersRepositories.save(user);
  }
}
