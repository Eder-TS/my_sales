// Container que permite a injeção de dependências.
import { ICustomerRepositories } from '@modules/customers/domain/repositories/ICustomerRepositories';
import customerRepositories from '@modules/customers/infra/database/repositories/CustomerRepositories';
import { IOrderRepositories } from '@modules/orders/domain/repositories/IOrderRepositories';
import orderRepositories from '@modules/orders/infra/database/repositories/OrderRepositories';
import { IProductsRepositories } from '@modules/products/domain/repositories/IProductsRepositories';
import productsRepositories from '@modules/products/infra/database/repositories/ProductsRepositories';
import { IUsersRepositories } from '@modules/users/domain/repositories/IUsersRepositories';
import { IUserTokensRepositories } from '@modules/users/domain/repositories/IUserTokensRepositories';
import usersRepositories from '@modules/users/infra/database/repositories/UsersRepositories';
import userTokensRepositories from '@modules/users/infra/database/repositories/UserTokensRepositories';
import { container } from 'tsyringe';

container.registerSingleton<ICustomerRepositories>(
  'CustomerRepositories',
  customerRepositories,
);

container.registerSingleton<IOrderRepositories>(
  'OrderRepositories',
  orderRepositories,
);

container.registerSingleton<IProductsRepositories>(
  'ProductsRepositories',
  productsRepositories,
);

container.registerSingleton<IUsersRepositories>(
  'UsersRepositories',
  usersRepositories,
);

container.registerSingleton<IUserTokensRepositories>(
  'UserTokensRepositories',
  userTokensRepositories,
);
