import AppError from '@shared/errors/AppError';
import { User } from '../database/entities/User';
import { usersRepositories } from '../database/repositories/UsersRepositories';
import bcrypt from 'bcrypt';

interface ICreateUser {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  async execute({ name, email, password }: ICreateUser): Promise<User> {
    const userExists = await usersRepositories.findByEmail(email);

    if (userExists)
      throw new AppError('There is already one user with this email.', 409);

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = usersRepositories.create({
      name,
      email,
      password: encryptedPassword,
    });

    await usersRepositories.save(user);

    return user;
  }
}
