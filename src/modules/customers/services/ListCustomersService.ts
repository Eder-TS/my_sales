import { Customer } from '../database/entities/Customer';
import { customerRepositories } from '../database/repositories/CustomerRepositories';

export default class ListCustomersService {
  async execute(): Promise<Customer[]> {
    const customers = await customerRepositories.find();

    return customers;
  }
}
