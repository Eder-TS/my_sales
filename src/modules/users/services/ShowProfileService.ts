import AppError from '@shared/errors/AppError';
import { IUsersRepositories } from '../domain/repositories/IUsersRepositories';
import { IUser } from '../domain/models/IUser';
import { inject, injectable } from 'tsyringe';

interface IShowProfile {
  userId: number;
}

@injectable()
export default class ShowProfileService {
  constructor(
    @inject('UsersRepositories')
    private readonly usersRepositories: IUsersRepositories,
  ) {}
  async execute({ userId }: IShowProfile): Promise<IUser> {
    const user = await this.usersRepositories.findById(userId);

    if (!user) throw new AppError('User not found', 404);

    return user;
  }
}
