import { AppDataSource } from '@shared/typeorm/data-source';
import UserToken from '../entities/UserToken';

export const userTokensRepositories = AppDataSource.getRepository(
  UserToken,
).extend({
  async findByToken(token: string): Promise<UserToken | null> {
    return await this.findOneBy({ token });
  },

  async generate(userId: number): Promise<UserToken | null> {
    const userToken = this.create({
      userId,
    });

    await this.save(userToken);
    return userToken;
  },
});
