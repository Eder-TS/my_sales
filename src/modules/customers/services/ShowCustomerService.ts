import AppError from '@shared/errors/AppError';
import { Customer } from '../infra/database/entities/Customer';
import { ICustomerRepositories } from '../domain/repositories/ICustomerRepositories';

interface IShowCustomer {
  id: string;
}

export default class ShowCustomerService {
  constructor(private readonly customerRepositories: ICustomerRepositories) {}
  async execute({ id }: IShowCustomer): Promise<Customer> {
    const idToShow = Number(id);
    const customer = await this.customerRepositories.findById(idToShow);

    if (!customer) throw new AppError('Customer not found.', 404);

    return customer;
  }
}
