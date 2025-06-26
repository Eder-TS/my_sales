import AppError from '@shared/errors/AppError';
import { Product } from '../database/entities/Product';
import { productsRepositories } from '../database/repositories/ProductsRepositories';

interface IShowProduct {
  id: string;
}

export default class ShowProductService {
  async execute({ id }: IShowProduct): Promise<Product> {
    const idToShow = Number(id);
    const product = await productsRepositories.findById(idToShow);
    if (!product) throw new AppError('Product not found.', 404);

    return product;
  }
}
