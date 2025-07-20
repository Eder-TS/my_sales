import { Request, Response } from 'express';
import UpdateUserAvatarService from '../../../services/UpdateUserAvatarService';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

export default class UpdateUserAvatarControllers {
  async update(request: Request, resposnse: Response): Promise<Response> {
    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);
    const user = await updateUserAvatarService.execute({
      id: request.user.id,
      avatarFileName: request.file?.filename as string,
    });
    return resposnse.json(instanceToInstance(user));
  }
}
