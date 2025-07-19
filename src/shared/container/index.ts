import { ICustomerRepositories } from '@modules/customers/domain/repositories/ICustomerRepositories';
import customerRepositories from '@modules/customers/infra/database/repositories/CustomerRepositories';
import { container } from 'tsyringe';

container.registerSingleton<ICustomerRepositories>(
  'CustomerRepositories',
  customerRepositories,
);
