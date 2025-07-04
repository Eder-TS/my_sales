import AppError from '@shared/errors/AppError';
import { Customer } from '../database/entities/Customer';
import { customerRepositories } from '../database/repositories/CustomerRepositories';

interface IUpdateCustomer {
  id: string;
  name: string;
  email: string;
}

export default class UpdateCustomerService {
  async execute({ id, name, email }: IUpdateCustomer): Promise<Customer> {
    const idToUpdate = Number(id);
    const customer = await customerRepositories.findById(idToUpdate);

    if (!customer) throw new AppError('Customer not found.', 404);

    const customerExists = await customerRepositories.findbyEmail(email);

    if (customerExists && email !== customer.email)
      throw new AppError('There is already one customer with this email.', 409);

    customer.name = name;
    customer.email = email;

    await customerRepositories.save(customer);

    return customer;
  }
}
