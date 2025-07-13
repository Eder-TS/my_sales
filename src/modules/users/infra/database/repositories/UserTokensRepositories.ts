import { AppDataSource } from '@shared/infra/typeorm/data-source';
import UserTokens from '../entities/UserTokens';

export const userTokensRepositories = AppDataSource.getRepository(
  UserTokens,
).extend({
  async findByToken(token: string): Promise<UserTokens | null> {
    return await this.findOneBy({ token });
  },

  async generate(userId: number): Promise<UserTokens | null> {
    const userTokens = this.create({
      userId,
    });

    await this.save(userTokens);
    return userTokens;
  },
});
