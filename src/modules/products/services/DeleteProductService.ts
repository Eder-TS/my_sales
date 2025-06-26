import AppError from '@shared/errors/AppError';
import { productsRepositories } from '../database/repositories/ProductsRepositories';

interface IDeleteProduct {
  id: string;
}

export default class DeleteProductService {
  async execute({ id }: IDeleteProduct): Promise<void> {
    const idToDelete = Number(id);
    const product = await productsRepositories.findById(idToDelete);

    if (!product) throw new AppError('Product not found.', 404);

    await productsRepositories.delete(id);
  }
}
