import AppError from '@shared/errors/AppError';
import RedisCache from '@shared/cache/RedisCache';
import { ICreateProduct } from '../domain/models/ICreateProduct';
import { IProductsRepositories } from '../domain/repositories/IProductsRepositories';
import { IProduct } from '../domain/models/IProduct';

export default class CreateProductService {
  constructor(private readonly productsRepositories: IProductsRepositories) {}

  async execute({ name, price, quantity }: ICreateProduct): Promise<IProduct> {
    // Não usa esta linha se não usar cache do servidor/redis.
    const redisCache = new RedisCache();

    const productExists = await this.productsRepositories.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name.', 409);
    }

    const product = this.productsRepositories.create({
      name,
      price,
      quantity,
    });

    await this.productsRepositories.save(product);

    // Não usa esta linha se não usar cache do servidor/redis.
    await redisCache.invalidate('api-mysales-PRODUCT-LIST');

    return product;
  }
}
