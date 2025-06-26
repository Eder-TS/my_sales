import AppError from '@shared/errors/AppError';
import { customerRepositories } from '../database/repositories/CustomerRepositories';

interface IDeleteCustomer {
  id: string;
}

export default class DeleteCustomerService {
  async execute({ id }: IDeleteCustomer): Promise<void> {
    const idToDelete = Number(id);
    const customer = await customerRepositories.findById(idToDelete);

    if (!customer) throw new AppError('Customer not found.', 404);

    await customerRepositories.remove(customer);
  }
}
