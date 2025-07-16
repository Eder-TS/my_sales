import { ICreateCustomer } from '../models/ICreateCustomer';
import { ICustomer } from '../models/ICustomer';

export interface Pagination {
  take: number;
  skip: number;
}

// Domain driven design: aqui todos os métodos que um repositório qualquer
// deve implementar para Customer, independente de qual ferramenta eu use.
// Isso foi baseado nos métodos que services está usando.
// Também atende inversão de dependências do SOLID.
export interface ICustomerRepositories {
  findByEmail(email: string): Promise<ICustomer | null>;
  create(data: ICreateCustomer): Promise<ICustomer>;
  save(customer: ICustomer): Promise<ICustomer>;
  findById(id: number): Promise<ICustomer | null>;
  remove(customer: ICustomer): Promise<void>;
  findAndCount(pagination: Pagination): Promise<[ICustomer[], number]>;
  findByName(name: string): Promise<ICustomer | null>;
}
