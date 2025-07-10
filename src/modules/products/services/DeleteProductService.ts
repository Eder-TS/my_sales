import AppError from '@shared/errors/AppError';
import { productsRepositories } from '../database/repositories/ProductsRepositories';
import RedisCache from '@shared/cache/RedisCache';

interface IDeleteProduct {
  id: string;
}

export default class DeleteProductService {
  async execute({ id }: IDeleteProduct): Promise<void> {
    const idToDelete = Number(id);

    // Não usa esta linha se não usar cache do servidor/redis.
    const redisCache = new RedisCache();

    const product = await productsRepositories.findById(idToDelete);

    if (!product) throw new AppError('Product not found.', 404);

    // Não usa esta linha se não usar cache do servidor/redis.
    await redisCache.invalidate('api-mysales-PRODUCT-LIST');

    await productsRepositories.delete(id);
  }
}
