import { AppDataSource } from '@shared/infra/typeorm/data-source';
import { Product } from '../entities/Product';
import { In, Repository } from 'typeorm';
import {
  IProductsRepositories,
  IFindProducts,
} from '@modules/products/domain/repositories/IProductsRepositories';
import { ICreateProduct } from '@modules/products/domain/models/ICreateProduct';
import { IProduct } from '@modules/products/domain/models/IProduct';
import { IUpdateProductQuantity } from '@modules/products/domain/models/IUpdateProductQuantity';

export default class ProductsRepositories implements IProductsRepositories {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = AppDataSource.getRepository(Product);
  }

  async findByName(name: string): Promise<IProduct | null> {
    return await this.ormRepository.findOneBy({ name });
  }

  async findById(id: number): Promise<IProduct | null> {
    return await this.ormRepository.findOneBy({ id });
  }

  async findAllByIds(products: IFindProducts[]): Promise<IProduct[] | null> {
    const productsId = products.map(product => product.id);

    const existentProducts = await this.ormRepository.find({
      where: { id: In(productsId) },
    });

    return existentProducts;
  }

  create({ name, price, quantity }: ICreateProduct): IProduct {
    return this.ormRepository.create({ name, price, quantity });
  }

  async save(product: IProduct): Promise<IProduct> {
    await this.ormRepository.save(product);

    return product;
  }

  async delete(id: number): Promise<void> {
    await this.ormRepository.delete(id);
    return;
  }

  async find(): Promise<IProduct[] | null> {
    const products = await this.ormRepository.find();

    return products;
  }

  async updateQuantity(
    updateProductsQuantity: IUpdateProductQuantity[],
  ): Promise<void> {
    await this.ormRepository.save(updateProductsQuantity);
    return;
  }
}
