import { Request, RequestHandler, Response } from 'express';
import UpdateUserAvatarService from '../../../services/UpdateUserAvatarService';
import { container } from 'tsyringe';
import { instanceToInstance } from 'class-transformer';

export default class UpdateUserAvatarControllers {
  public update: RequestHandler = async (
    request: Request,
    resposnse: Response,
  ): Promise<void> => {
    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);
    const user = await updateUserAvatarService.execute({
      id: request.user.id,
      avatarFileName: request.file?.filename as string,
    });
    resposnse.json(instanceToInstance(user));
  };
}
