import AppError from '@shared/errors/AppError';
import { IProductsRepositories } from '../domain/repositories/IProductsRepositories';
import { IProduct } from '../domain/models/IProduct';

interface IShowProduct {
  id: string;
}

export default class ShowProductService {
  constructor(private readonly productsRepositories: IProductsRepositories) {}
  async execute({ id }: IShowProduct): Promise<IProduct> {
    const idToShow = Number(id);
    const product = await this.productsRepositories.findById(idToShow);
    if (!product) throw new AppError('Product not found.', 404);

    return product;
  }
}
