import AppError from '@shared/errors/AppError';
import { ICustomerRepositories } from '../domain/repositories/ICustomerRepositories';
interface IDeleteCustomer {
  id: string;
}

export default class DeleteCustomerService {
  constructor(private readonly customerRepositories: ICustomerRepositories) {}

  async execute({ id }: IDeleteCustomer): Promise<void> {
    const idToDelete = Number(id);
    const customer = await this.customerRepositories.findById(idToDelete);

    if (!customer) throw new AppError('Customer not found.', 404);

    await this.customerRepositories.remove(customer);
  }
}
