import CreateCustomerService from '@modules/customers/services/CreateCustomerService';
import DeleteCustomerService from '@modules/customers/services/DeleteCustomerService';
import ListCustomersService from '@modules/customers/services/ListCustomersService';
import ShowCustomerService from '@modules/customers/services/ShowCustomerService';
import UpdateCustomerService from '@modules/customers/services/UpdateCustomerService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

// Injeção de dependências com tsyringe.
// Teria que instanciar o repositório aqui, em vez disso injetamos usando um container.
// O mesmo será aplicado a todos os outros módulos.
export default class CustomersControllers {
  async create(request: Request, response: Response): Promise<Response> {
    const createCustomer = container.resolve(CreateCustomerService);
    const { name, email } = request.body;

    const customer = await createCustomer.execute({ name, email });

    return response.json(customer);
  }

  async list(request: Request, response: Response): Promise<Response> {
    const listCustomers = container.resolve(ListCustomersService);
    const page = request.query.page as string;
    const limit = request.query.limit as string;

    const customers = await listCustomers.execute(page, limit);

    return response.json(customers);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const showCustomer = container.resolve(ShowCustomerService);
    const id = request.params.id;

    const customer = await showCustomer.execute({ id });

    return response.json(customer);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const updateCustomer = container.resolve(UpdateCustomerService);
    const id = request.params.id;
    const { name, email } = request.body;

    const customer = await updateCustomer.execute({ id, name, email });

    return response.json(customer);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const deleteCustomer = container.resolve(DeleteCustomerService);
    const id = request.params.id;

    await deleteCustomer.execute({ id });

    return response.sendStatus(200);
  }
}
