import { AppDataSource } from '@shared/infra/typeorm/data-source';
import UserTokens from '../entities/UserTokens';
import { IUserTokensRepositories } from '@modules/users/domain/repositories/IUserTokensRepositories';
import { Repository } from 'typeorm';
import { IUserTokens } from '@modules/users/domain/models/IUserTokens';

export default class UserTokensRepositories implements IUserTokensRepositories {
  private ormRepository: Repository<UserTokens>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(UserTokens);
  }

  async findByToken(token: string): Promise<IUserTokens | null> {
    return await this.ormRepository.findOneBy({ token });
  }

  async generate(userId: number): Promise<IUserTokens | null> {
    const userTokens = this.ormRepository.create({
      userId,
    });

    await this.ormRepository.save(userTokens);
    return userTokens;
  }
}
