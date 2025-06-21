import AppError from '@shared/errors/AppError';
import { customerRepositories } from '../database/repositories/CustomerRepositories';
import { Customer } from '../database/entities/Customer';

interface ICreateCustomer {
  name: string;
  email: string;
}

export default class CreateCustomerService {
  async execute({ name, email }: ICreateCustomer): Promise<Customer> {
    const emailExists = await customerRepositories.findbyEmail(email);

    if (emailExists) throw new AppError('Email address already used.', 409);

    const customer = customerRepositories.create({ name, email });

    await customerRepositories.save(customer);

    return customer;
  }
}
