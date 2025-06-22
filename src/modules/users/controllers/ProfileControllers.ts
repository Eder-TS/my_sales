import { Request, Response } from 'express';
import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';

export default class ProfileControllers {
  public async show(request: Request, response: Response): Promise<Response> {
    const showProfile = new ShowProfileService();

    // Feita a estenção de Request do Express para adiconar a propriedade
    // user.id e ficar mais fácil usar este dado.
    const userId = request.user.id;

    const user = await showProfile.execute({ userId });

    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateProfile = new UpdateProfileService();
    const userId = request.user.id;
    const { name, email, password, old_password } = request.body;

    const user = await updateProfile.execute({
      userId,
      name,
      email,
      password,
      old_password,
    });

    return response.json(user);
  }
}
