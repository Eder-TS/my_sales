import AppError from '@shared/errors/AppError';
import { Product } from '../infra/database/entities/Product';
import { productsRepositories } from '../infra/database/repositories/ProductsRepositories';
import RedisCache from '@shared/cache/RedisCache';
import { ICreateProduct } from '../domain/models/ICreateProduct';

export default class CreateProductService {
  async execute({ name, price, quantity }: ICreateProduct): Promise<Product> {
    // Não usa esta linha se não usar cache do servidor/redis.
    const redisCache = new RedisCache();

    const productExists = await productsRepositories.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name.', 409);
    }

    const product = productsRepositories.create({
      name,
      price,
      quantity,
    });

    await productsRepositories.save(product);

    // Não usa esta linha se não usar cache do servidor/redis.
    await redisCache.invalidate('api-mysales-PRODUCT-LIST');

    return product;
  }
}
