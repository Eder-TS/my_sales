import { ICreateProduct } from '@modules/products/domain/models/ICreateProduct';
import { IProduct } from '@modules/products/domain/models/IProduct';
import { IUpdateProductQuantity } from '@modules/products/domain/models/IUpdateProductQuantity';
import {
  IFindProducts,
  IProductsRepositories,
} from '@modules/products/domain/repositories/IProductsRepositories';
import { Product } from '@modules/products/infra/database/entities/Product';

export default class FakeProductsRespositories
  implements IProductsRepositories
{
  private products: Product[] = [];

  async findByName(name: string): Promise<IProduct | null> {
    const product = await this.products.find(product => product.name === name);
    return product ?? null;
  }

  async findById(id: number): Promise<IProduct | null> {
    const product = await this.products.find(product => product.id === id);
    return product ?? null;
  }

  async findAllByIds(products: IFindProducts[]): Promise<IProduct[] | null> {
    const productsToReturn = await this.products.filter(product =>
      products.some(productsId => productsId.id === product.id),
    );

    return productsToReturn ?? null;
  }

  async find(): Promise<IProduct[] | null> {
    return this.products || null;
  }

  create(data: ICreateProduct): IProduct {
    const newProduct = new Product();

    newProduct.id = this.products.length + 1;
    newProduct.name = data.name;
    newProduct.price = data.price;
    newProduct.quantity = data.quantity;

    return newProduct;
  }

  async save(product: IProduct): Promise<IProduct> {
    await this.products.push(product);
    return product;
  }

  async delete(id: number): Promise<void> {
    this.products = await this.products.filter(product => product.id !== id);
    return;
  }

  async updateQuantity(data: IUpdateProductQuantity[]): Promise<void> {
    await this.products.forEach(product => {
      data.map(d => product.id === d.id && (product.quantity = d.quantity));
    });
    return;
  }
}
