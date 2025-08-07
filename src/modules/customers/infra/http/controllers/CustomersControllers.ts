import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import DeleteCustomerService from '@modules/customers/services/DeleteCustomerService';
import ListCustomersService from '@modules/customers/services/ListCustomersService';
import ShowCustomerService from '@modules/customers/services/ShowCustomerService';
import UpdateCustomerService from '@modules/customers/services/UpdateCustomerService';
import { Request, RequestHandler, Response } from 'express';
import { container } from 'tsyringe';

// Injeção de dependências com tsyringe.
// Teria que instanciar o repositório aqui, em vez disso injetamos usando um container.
// O mesmo será aplicado a todos os outros módulos.
export default class CustomersControllers {
  // A solução para erro "No overload matches this call" em CustomerRoutes, referente a customerControllers.(method)
  // está na tipagem dos métodos com RequestHandler.
  public create: RequestHandler = async (
    request: Request,
    response: Response,
  ): Promise<void> => {
    const createCustomer = container.resolve(CreateCustomerService);
    const { name, email } = request.body;

    const customer = await createCustomer.execute({ name, email });

    response.json(customer);
    return;
  };

  public list: RequestHandler = async (
    request: Request,
    response: Response,
  ): Promise<void> => {
    const listCustomers = container.resolve(ListCustomersService);
    const page = request.query.page as string;
    const limit = request.query.limit as string;

    const customers = await listCustomers.execute(page, limit);

    response.json(customers);
  };

  public show: RequestHandler = async (
    request: Request,
    response: Response,
  ): Promise<void> => {
    const showCustomer = container.resolve(ShowCustomerService);
    const id = request.params.id;

    const customer = await showCustomer.execute({ id });

    response.json(customer);
  };

  public update: RequestHandler = async (
    request: Request,
    response: Response,
  ): Promise<void> => {
    const updateCustomer = container.resolve(UpdateCustomerService);
    const id = request.params.id;
    const { name, email } = request.body;

    const customer = await updateCustomer.execute({ id, name, email });

    response.json(customer);
  };

  public delete: RequestHandler = async (
    request: Request,
    response: Response,
  ): Promise<void> => {
    const deleteCustomer = container.resolve(DeleteCustomerService);
    const id = request.params.id;

    await deleteCustomer.execute({ id });

    response.sendStatus(200);
  };
}
