import AppError from '@shared/errors/AppError';
import path from 'path';
import uploadConfig from '@config/upload';
import fs from 'fs';
import { IUsersRepositories } from '../domain/repositories/IUsersRepositories';
import { IUser } from '../domain/models/IUser';
import { inject, injectable } from 'tsyringe';

interface IUpdateUserAvatar {
  id: number;
  avatarFileName: string;
}

@injectable()
export default class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepositories')
    private readonly usersRepositories: IUsersRepositories,
  ) {}
  async execute({ id, avatarFileName }: IUpdateUserAvatar): Promise<IUser> {
    const user = await this.usersRepositories.findById(id);
    if (!user) throw new AppError('User not found', 404);

    if (user.avatar) {
      // Verifica a existência de um avatar recriando o path e depois verificando
      // se um arquivo com este nome esxiste neste path.
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      // Foi usado um bloco try/catch para evitar erro indesejado caso aconteça do arquivo ser deletado
      // da pasta uploads as ainda ter o nome salvo no BD.
      try {
        const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
        if (userAvatarFileExists) {
          // Deleta com unlink.
          await fs.promises.unlink(userAvatarFilePath);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {}
    }

    user.avatar = avatarFileName;
    await this.usersRepositories.save(user);
    return user;
  }
}
