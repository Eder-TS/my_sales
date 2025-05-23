import { AppDataSource } from '@shared/typeorm/data-source';
import { User } from '../entities/User';

export const usersRepositories = AppDataSource.getRepository(User).extend({
  async findByName(name: string): Promise<User | null> {
    return await this.findOneBy({ name });
  },
  async findById(id: number): Promise<User | null> {
    return await this.findOneBy({ id });
  },
  async findByEmail(email: string): Promise<User | null> {
    return await this.findOneBy({ email });
  },
});
