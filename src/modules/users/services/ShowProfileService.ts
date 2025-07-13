import AppError from '@shared/errors/AppError';
import { User } from '../infra/database/entities/User';
import { usersRepositories } from '../infra/database/repositories/UsersRepositories';

interface IShowProfile {
  userId: number;
}

export default class ShowProfileService {
  async execute({ userId }: IShowProfile): Promise<User> {
    const user = await usersRepositories.findById(userId);

    if (!user) throw new AppError('User not found', 404);

    return user;
  }
}
