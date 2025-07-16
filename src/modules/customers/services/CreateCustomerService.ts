import AppError from '@shared/errors/AppError';
import { Customer } from '../infra/database/entities/Customer';
import { ICreateCustomer } from '../domain/models/ICreateCustomer';
import { ICustomerRepositories } from '../domain/repositories/ICustomerRepositories';

export default class CreateCustomerService {
  // A interface aqui é usada como princípio do SOLID, fazendo a inversão da dependência.
  // Este serviço não sabe o quê acontece no repositório, apenas segue a interface do domínio.
  constructor(private readonly customerRepositories: ICustomerRepositories) {}

  public async execute({ name, email }: ICreateCustomer): Promise<Customer> {
    const emailExists = await this.customerRepositories.findByEmail(email);

    if (emailExists) throw new AppError('Email address already used.', 409);

    const customer = await this.customerRepositories.create({ name, email });

    return customer;
  }
}
