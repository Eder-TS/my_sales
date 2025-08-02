import { User } from '@modules/users/infra/database/entities/User';
import { ICreateUser } from '../../models/ICreateUser';
import { IUser } from '../../models/IUser';
import { IUsersRepositories } from '../IUsersRepositories';
import { v4 as uuidv4 } from 'uuid';

export default class FakeUsersRepositories implements IUsersRepositories {
  private users: User[] = [];

  create(user: ICreateUser): IUser {
    const newUser = new User();

    newUser.id = this.users.length + 1;
    newUser.name = user.name;
    newUser.email = user.email;
    newUser.password = user.password;

    return newUser;
  }

  async save(user: IUser): Promise<void> {
    await this.users.push(user as User);
    return;
  }

  async find(): Promise<IUser[]> {
    return await this.users;
  }

  async findById(id: number): Promise<IUser | null> {
    const user = await this.users.find(user => user.id === id);
    return user ?? null;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await this.users.find(search => search.email === email);
    return user ?? null;
  }

  async findByName(name: string): Promise<IUser | null> {
    const user = await this.users.find(user => user.name === name);
    return user ?? null;
  }
}
