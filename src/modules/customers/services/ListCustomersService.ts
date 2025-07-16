import { IPagination } from '@shared/interfaces/pagination.interface';
import { Customer } from '../infra/database/entities/Customer';
import { ICustomerRepositories } from '../domain/repositories/ICustomerRepositories';

export default class ListCustomersService {
  constructor(private readonly customerRepositories: ICustomerRepositories) {}

  // Recebe, opcionalmente, a página e limite de linhas por página para
  // fazer a paginação e não sobrecarregar o banco de dados.
  async execute(
    queryPage: string,
    queryLimit: string,
  ): Promise<IPagination<Customer>> {
    // Obs: Number("0") || 10 resulta em 10, então '0' é tratado como inválido.
    // Isso é desejado neste contexto.
    const page = Number(queryPage) || 1;
    const limit = Number(queryLimit) || 10;

    const [data, total] = await this.customerRepositories.findAndCount({
      take: limit,
      skip: (page - 1) * limit,
    });

    const totalPages = Math.ceil(total / limit);

    return {
      per_page: limit,
      total,
      current_page: page,
      total_pages: totalPages,
      next_page: page < totalPages ? page + 1 : null,
      prev_page: page > 1 ? page - 1 : null,
      data,
    } as IPagination<Customer>;
  }
}
