import { AppDataSource } from '@shared/typeorm/data-source';
import { User } from '../entities/User';
import AppError from '@shared/errors/AppError';

export const usersRepositories = AppDataSource.getRepository(User).extend({
  async findByName(name: string): Promise<User | null> {
    if (!name || typeof name !== 'string')
      throw new AppError('Invalid search value to database.', 400);

    return await this.findOneBy({ name });
  },
  async findById(id: number): Promise<User | null> {
    if (!id || typeof id !== 'number')
      throw new AppError('Invalid search value to database.', 400);

    return await this.findOneBy({ id });
  },
  async findByEmail(email: string): Promise<User | null> {
    if (!email || typeof email !== 'string')
      throw new AppError('Invalid search value to database.', 400);

    return await this.findOneBy({ email });
  },
});
