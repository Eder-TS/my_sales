import { Request, RequestHandler, Response } from 'express';
import ListUsersService from '../../../services/ListUsersService';
import CreateUserService from '../../../services/CreateUserService';
import { instanceToInstance } from 'class-transformer';
import { container } from 'tsyringe';

export default class UsersControllers {
  public list: RequestHandler = async (
    request: Request,
    response: Response,
  ): Promise<void> => {
    const listUsersService = container.resolve(ListUsersService);

    const users = await listUsersService.execute();

    // Usando a biblioteca class-transformer para que as senhas salvas no banco
    // de dados não sejam mostradas nas pesquisas, neste caso específico para
    // a busca de todos os users.
    response.json(instanceToInstance(users));
  };

  public create: RequestHandler = async (
    request: Request,
    response: Response,
  ): Promise<void> => {
    const { name, email, password } = request.body;
    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({ name, email, password });

    response.json(instanceToInstance(user));
  };
}
