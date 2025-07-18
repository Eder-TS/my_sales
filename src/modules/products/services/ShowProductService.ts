import AppError from '@shared/errors/AppError';
import { Product } from '../infra/database/entities/Product';
import { IProductsRepositories } from '../domain/repositories/IProductsRepositories';

interface IShowProduct {
  id: string;
}

export default class ShowProductService {
  constructor(private readonly productsRepositories: IProductsRepositories) {}
  async execute({ id }: IShowProduct): Promise<Product> {
    const idToShow = Number(id);
    const product = await this.productsRepositories.findById(idToShow);
    if (!product) throw new AppError('Product not found.', 404);

    return product;
  }
}
