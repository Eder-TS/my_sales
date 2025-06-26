import { Request, Response } from 'express';
import CreateCustomerService from '../services/CreateCustomerService';
import ListCustomersService from '../services/ListCustomersService';
import ShowCustomerService from '../services/ShowCustomerService';
import UpdateCustomerService from '../services/UpdateCustomerService';
import DeleteCustomerService from '../services/DeleteCustomerService';

export default class CustomersControllers {
  async create(request: Request, response: Response): Promise<Response> {
    const createCustomer = new CreateCustomerService();
    const { name, email } = request.body;

    const customer = await createCustomer.execute({ name, email });

    return response.json(customer);
  }

  async list(request: Request, response: Response): Promise<Response> {
    const listCustomers = new ListCustomersService();

    const customer = await listCustomers.execute();

    return response.json(customer);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const showCustomer = new ShowCustomerService();
    const id = request.params.id;

    const customer = await showCustomer.execute({ id });

    return response.json(customer);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const updateCustomer = new UpdateCustomerService();
    const id = request.params.id;
    const { name, email } = request.body;

    const customer = await updateCustomer.execute({ id, name, email });

    return response.json(customer);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const deleteCustomer = new DeleteCustomerService();
    const id = request.params.id;

    await deleteCustomer.execute({ id });

    return response.sendStatus(200);
  }
}
