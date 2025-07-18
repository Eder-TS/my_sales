import { AppDataSource } from '@shared/infra/typeorm/data-source';
import UserTokens from '../entities/UserTokens';
import { IUserTokensRepositories } from '@modules/users/domain/repositories/IUserTokensRepositories';
import { Repository } from 'typeorm';

export default class UserTokensRepositories implements IUserTokensRepositories {
  private ormRepository: Repository<UserTokens>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(UserTokens);
  }

  async findByToken(token: string): Promise<UserTokens | null> {
    return await this.ormRepository.findOneBy({ token });
  }

  async generate(userId: number): Promise<UserTokens | null> {
    const userTokens = this.ormRepository.create({
      userId,
    });

    await this.ormRepository.save(userTokens);
    return userTokens;
  }
}
