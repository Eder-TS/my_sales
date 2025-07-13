import AppError from '@shared/errors/AppError';
import { Product } from '../infra/database/entities/Product';
import { productsRepositories } from '../infra/database/repositories/ProductsRepositories';
import RedisCache from '@shared/cache/RedisCache';

interface IUpdateProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}
export default class UpdateProductService {
  async execute({
    id,
    name,
    price,
    quantity,
  }: IUpdateProduct): Promise<Product> {
    const idToUpdate = Number(id);
    const productExistsById = await productsRepositories.findById(idToUpdate);

    // Não usa esta linha se não usar cache do servidor/redis.
    const redisCache = new RedisCache();

    if (!productExistsById) throw new AppError('Product not found', 404);

    const productExistsByName = await productsRepositories.findByName(name);

    // Atenção para typeof productExistsByName.id = number e typeof id = string.
    if (productExistsByName && productExistsByName.id != idToUpdate)
      throw new AppError('There is already one product with this name.', 409);

    productExistsById.name = name;
    productExistsById.price = price;
    productExistsById.quantity = quantity;

    await productsRepositories.save(productExistsById);

    // Não usa esta linha se não usar cache do servidor/redis.
    await redisCache.invalidate('api-mysales-PRODUCT-LIST');

    return productExistsById;
  }
}
