import { IUser } from '../domain/models/IUser';
import { IUsersRepositories } from '../domain/repositories/IUsersRepositories';

export default class ListUsersService {
  constructor(private readonly usersRepositories: IUsersRepositories) {}
  async execute(): Promise<IUser[]> {
    const users = await this.usersRepositories.find();

    return users;
  }
}
