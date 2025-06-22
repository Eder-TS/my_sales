import AppError from '@shared/errors/AppError';
import { Product } from '../database/entities/Product';
import { productsRepositories } from '../database/repositories/ProductsRepositories';

interface IUpdateProduct {
  id: number;
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
    const productExistsById = await productsRepositories.findById(id);

    if (!productExistsById) throw new AppError('Product not found', 404);

    const productExistsByName = await productsRepositories.findByName(name);

    // Atenção para typeof productExistsByName.id = number e typeof id = string.
    if (productExistsByName && productExistsByName.id != id)
      throw new AppError('There is already one product with this name.', 409);

    productExistsById.name = name;
    productExistsById.price = price;
    productExistsById.quantity = quantity;

    const updateProduct = await productsRepositories.save(productExistsById);

    return updateProduct;
  }
}
