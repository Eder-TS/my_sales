import AppError from '@shared/errors/AppError';
import { User } from '../infra/database/entities/User';
import { usersRepositories } from '../infra/database/repositories/UsersRepositories';
import path from 'path';
import uploadConfig from '@config/upload';
import fs from 'fs';

interface IUpdateUserAvatar {
  id: number;
  avatarFileName: string;
}

export default class UpdateUserAvatarService {
  async execute({ id, avatarFileName }: IUpdateUserAvatar): Promise<User> {
    const user = await usersRepositories.findById(id);
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
      } catch (error) {}
    }

    user.avatar = avatarFileName;
    await usersRepositories.save(user);
    return user;
  }
}
