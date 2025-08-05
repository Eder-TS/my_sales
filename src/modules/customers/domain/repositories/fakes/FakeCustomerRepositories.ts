import { Customer } from '@modules/customers/infra/database/entities/Customer';
import { ICreateCustomer } from '../../models/ICreateCustomer';
import { ICustomer } from '../../models/ICustomer';
import { ICustomerRepositories, Pagination } from '../ICustomerRepositories';

export default class FakeCustomerRepositories implements ICustomerRepositories {
  findAndCount(pagination: Pagination): Promise<[ICustomer[], number]> {
    throw new Error('Method not implemented.');
  }
  private customers: Customer[] = [];

  async findByEmail(email: string): Promise<ICustomer | null> {
    const customer = this.customers.find(customer => customer.email === email);
    return customer ?? null;
  }

  async create(data: ICreateCustomer): Promise<ICustomer> {
    const customer = new Customer();

    customer.id = this.customers.length + 1;
    customer.name = data.name;
    customer.email = data.email;

    this.customers.push(customer);

    return customer;
  }

  async save(customer: ICustomer): Promise<ICustomer> {
    const finIndex = this.customers.findIndex(
      findCustomer => findCustomer.id === customer.id,
    );

    this.customers[finIndex] = customer;

    return customer;
  }

  async findById(id: number): Promise<ICustomer | null> {
    const customer = this.customers.find(
      findCustomer => findCustomer.id === id,
    );

    // Este retorno funciona bem para este caso pois find retorna Customer ou undefined,
    // porém em outras situações com retornos '' ou NaN, por exemplo, o código pode não funcionar como esperado...
    //--->return (customer as ICustomer) || null;
    // ...então é mais acertivo usar o operador ?? que vai para o lado direito da expressão se customer for undefined.
    return customer ?? null;
  }

  async remove(customer: ICustomer): Promise<void> {
    this.customers = this.customers.filter(
      remainCustomer => remainCustomer.id !== customer.id,
    );
    return;
  }

  async findByName(name: string): Promise<ICustomer | null> {
    const customer = this.customers.find(customer => customer.name === name);

    return customer ?? null;
  }
}
