import { productsRepositories } from '../database/repositories/ProductsRepositories';
import { Product } from '../database/entities/Product';
import RedisCache from '@shared/cache/RedisCache';

export default class ListProductsService {
  async execute(): Promise<Product[]> {
    const redisCache = new RedisCache();

    let products = await redisCache.recover<Product[]>(
      'api-mysales-PRODUCT-LIST',
    );

    if (!products) {
      products = await productsRepositories.find();

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
