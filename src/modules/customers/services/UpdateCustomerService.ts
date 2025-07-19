import AppError from '@shared/errors/AppError';
import { Customer } from '../infra/database/entities/Customer';
import { ICustomerRepositories } from '../domain/repositories/ICustomerRepositories';
import { inject, injectable } from 'tsyringe';

interface IUpdateCustomer {
  id: string;
  name: string;
  email: string;
}

@injectable()
export default class UpdateCustomerService {
  constructor(
    @inject('CustomerRepositories')
    private readonly customerRepositories: ICustomerRepositories,
  ) {}
  async execute({ id, name, email }: IUpdateCustomer): Promise<Customer> {
    const idToUpdate = Number(id);
    const customer = await this.customerRepositories.findById(idToUpdate);

    if (!customer) throw new AppError('Customer not found.', 404);

    const customerExists = await this.customerRepositories.findByEmail(email);

    if (customerExists && email !== customer.email)
      throw new AppError('There is already one customer with this email.', 409);

    customer.name = name;
    customer.email = email;

    await this.customerRepositories.save(customer);

    return customer;
  }
}
