import AppError from '@shared/errors/AppError';
import bcrypt from 'bcrypt';
import { ICreateUser } from '../domain/models/ICreateUser';
import { IUsersRepositories } from '../domain/repositories/IUsersRepositories';
import { IUser } from '../domain/models/IUser';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class CreateUserService {
  constructor(
    @inject('UsersRepositories')
    private readonly usersRepositories: IUsersRepositories,
  ) {}
  async execute({ name, email, password }: ICreateUser): Promise<IUser> {
    const userExists = await this.usersRepositories.findByEmail(email);

    if (userExists)
      throw new AppError('There is already one user with this email.', 409);

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = this.usersRepositories.create({
      name,
      email,
      password: encryptedPassword,
    });

    await this.usersRepositories.save(user);

    return user;
  }
}
