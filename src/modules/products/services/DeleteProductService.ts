import AppError from '@shared/errors/AppError';
import RedisCache from '@shared/cache/RedisCache';
import { IProductsRepositories } from '../domain/repositories/IProductsRepositories';

interface IDeleteProduct {
  id: string;
}

export default class DeleteProductService {
  constructor(private readonly productsRepositories: IProductsRepositories) {}
  async execute({ id }: IDeleteProduct): Promise<void> {
    const idToDelete = Number(id);

    // Não usa esta linha se não usar cache do servidor/redis.
    const redisCache = new RedisCache();

    const product = await this.productsRepositories.findById(idToDelete);

    if (!product) throw new AppError('Product not found.', 404);

    // Não usa esta linha se não usar cache do servidor/redis.
    await redisCache.invalidate('api-mysales-PRODUCT-LIST');

    await this.productsRepositories.delete(idToDelete);
  }
}
