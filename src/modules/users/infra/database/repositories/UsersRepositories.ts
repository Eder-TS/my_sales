import { AppDataSource } from '@shared/infra/typeorm/data-source';
import { User } from '../entities/User';
import AppError from '@shared/errors/AppError';
import { IUsersRepositories } from '@modules/users/domain/repositories/IUsersRepositories';
import { Repository } from 'typeorm';
import { IUser } from '@modules/users/domain/models/IUser';
import { ICreateUser } from '@modules/users/domain/models/ICreateUser';

export default class UsersRepositories implements IUsersRepositories {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(User);
  }

  create(user: ICreateUser): IUser {
    const newUser = this.ormRepository.create(user);

    return newUser;
  }

  async save(user: IUser): Promise<void> {
    await this.ormRepository.save(user);
    return;
  }

  async find(): Promise<IUser[]> {
    const users = await this.ormRepository.find();

    return users;
  }

  async findById(id: number): Promise<IUser | null> {
    if (!id || typeof id !== 'number')
      throw new AppError('Invalid search value to database.', 400);

    const user = await this.ormRepository.findOneBy({ id });

    return user;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    if (!email || typeof email !== 'string')
      throw new AppError('Invalid search value to database.', 400);

    const user = await this.ormRepository.findOneBy({ email });

    return user;
  }

  async findByName(name: string): Promise<IUser | null> {
    if (!name || typeof name !== 'string')
      throw new AppError('Invalid search value to database.', 400);

    const user = await this.ormRepository.findOneBy({ name });

    return user;
  }
}
