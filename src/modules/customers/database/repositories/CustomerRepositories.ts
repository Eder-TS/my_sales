import { AppDataSource } from '@shared/typeorm/data-source';
import { Customer } from '../entities/Customer';

export const customerRepositories = AppDataSource.getRepository(
  Customer,
).extend({
  async findbyName(name: string): Promise<Customer | null> {
    const customer = await this.findOneBy({ name });

    return customer;
  },

  async findById(id: number): Promise<Customer | null> {
    const customer = await this.findOneBy({ id });

    return customer;
  },

  async findbyEmail(email: string): Promise<Customer | null> {
    const customer = await this.findOneBy({ email });

    return customer;
  },
});
