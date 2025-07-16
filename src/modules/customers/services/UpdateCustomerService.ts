import AppError from '@shared/errors/AppError';
import { Customer } from '../infra/database/entities/Customer';
import { ICustomerRepositories } from '../domain/repositories/ICustomerRepositories';

interface IUpdateCustomer {
  id: string;
  name: string;
  email: string;
}

export default class UpdateCustomerService {
  constructor(private readonly customerRepositories: ICustomerRepositories) {}
  async execute({ id, name, email }: IUpdateCustomer): Promise<Customer> {
    const idToUpdate = Number(id);
    const customer = await this.customerRepositories.findById(idToUpdate);

    if (!customer) throw new AppError('Customer not found.', 404);

    const customerExists = await this.customerRepositories.findbyEmail(email);

    if (customerExists && email !== customer.email)
      throw new AppError('There is already one customer with this email.', 409);

    customer.name = name;
    customer.email = email;

    await this.customerRepositories.save(customer);

    return customer;
  }
}
