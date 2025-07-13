import AppError from '@shared/errors/AppError';
import { customerRepositories } from '../infra/database/repositories/CustomerRepositories';
import { Customer } from '../infra/database/entities/Customer';

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
