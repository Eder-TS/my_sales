import RedisCache from '@shared/cache/RedisCache';
import { IProduct } from '../domain/models/IProduct';
import { IProductsRepositories } from '../domain/repositories/IProductsRepositories';

export default class ListProductsService {
  constructor(private readonly productsRepositories: IProductsRepositories) {}

  async execute(): Promise<IProduct[]> {
    const redisCache = new RedisCache();

    let products = await redisCache.recover<IProduct[]>(
      'api-mysales-PRODUCT-LIST',
    );

    if (!products) {
      products = await this.productsRepositories.find();

      await redisCache.save(
        'api-mysales-PRODUCT-LIST',
        JSON.stringify(products),
      );
    }

    return products;
  }
}

// List sem usar o cache do servidor/redis.

// import { productsRepositories } from '../database/repositories/ProductsRepositories';
// import { Product } from '../database/entities/Product';

// export default class ListProductsService {
//   async execute(): Promise<Product[]> {
//     const products = await productsRepositories.find();

//     return products;
//   }
// }
