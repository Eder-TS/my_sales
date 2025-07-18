import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcrypt';
import { IUsersRepositories } from '../domain/repositories/IUsersRepositories';
import { IUser } from '../domain/models/IUser';

interface IUpdateProfile {
  userId: number;
  name: string;
  email: string;
  password: string;
  old_password: string;
}

export default class UpdateProfileService {
  constructor(private readonly usersRepositories: IUsersRepositories) {}
  async execute({
    userId,
    name,
    email,
    password,
    old_password,
  }: IUpdateProfile): Promise<IUser> {
    const user = await this.usersRepositories.findById(userId);

    if (!user) throw new AppError('User not found', 404);

    if (email) {
      const userUpdateEmail = await this.usersRepositories.findByEmail(email);

      if (userUpdateEmail)
        throw new AppError('There is already one user with this email.', 409);

      user.email = email;
    }

    if (password && !old_password)
      throw new AppError('Old password is required.');

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) throw new AppError('Old password does not match.');

      user.password = await hash(password, 10);
    }

    if (name) {
      user.name = name;
    }

    await this.usersRepositories.save(user);

    return user;
  }
}
