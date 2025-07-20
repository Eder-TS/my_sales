import { Request, Response } from 'express';
import ListUsersService from '../../../services/ListUsersService';
import CreateUserService from '../../../services/CreateUserService';
import { instanceToInstance } from 'class-transformer';
import { container } from 'tsyringe';

export default class UsersControllers {
  async list(request: Request, response: Response): Promise<Response> {
    const listUsersService = container.resolve(ListUsersService);

    const users = await listUsersService.execute();

    // Usando a biblioteca class-transformer para que as senhas salvas no banco
    // de dados não sejam mostradas nas pesquisas, neste caso específico para
    // a busca de todos os users.
    return response.json(instanceToInstance(users));
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({ name, email, password });

    return response.json(instanceToInstance(user));
  }
}
