import { Request, Response } from 'express';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

export default class UpdateUserAvatarControllers {
  async update(request: Request, resposnse: Response): Promise<Response> {
    const updateUserAvatarService = new UpdateUserAvatarService();
    const user = await updateUserAvatarService.execute({
      id: request.user.id,
      avatarFileName: request.file?.filename as string,
    });
    return resposnse.json(user);
  }
}
