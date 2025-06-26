import AppError from '@shared/errors/AppError';
import { Customer } from '../database/entities/Customer';
import { customerRepositories } from '../database/repositories/CustomerRepositories';

interface IShowCustomer {
  id: string;
}

export default class ShowCustomerService {
  async execute({ id }: IShowCustomer): Promise<Customer> {
    const idToShow = Number(id);
    const customer = await customerRepositories.findById(idToShow);

    if (!customer) throw new AppError('Customer not found.', 404);

    return customer;
  }
}
