import { productsRepositories } from '../database/repositories/ProductsRepositories';
import { Product } from '../database/entities/Product';

export default class ListProductsService {
  async execute(): Promise<Product[]> {
    const products = await productsRepositories.find();

    return products;
  }
}
