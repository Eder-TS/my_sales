import AppError from '@shared/errors/AppError';
import { Customer } from '../infra/database/entities/Customer';
import { customerRepositories } from '../infra/database/repositories/CustomerRepositories';
import { ICreateCustomer } from '../domain/models/ICreateCustomer';

export default class CreateCustomerService {
  async execute({ name, email }: ICreateCustomer): Promise<Customer> {
    const emailExists = await customerRepositories.findbyEmail(email);

    if (emailExists) throw new AppError('Email address already used.', 409);

    const customer = customerRepositories.create({ name, email });

    await customerRepositories.save(customer);

    return customer;
  }
}
