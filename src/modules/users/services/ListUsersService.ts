import { inject, injectable } from 'tsyringe';
import { IUser } from '../domain/models/IUser';
import { IUsersRepositories } from '../domain/repositories/IUsersRepositories';

@injectable()
export default class ListUsersService {
  constructor(
    @inject('UsersRepositories')
    private readonly usersRepositories: IUsersRepositories,
  ) {}
  async execute(): Promise<IUser[]> {
    const users = await this.usersRepositories.find();

    return users;
  }
}
