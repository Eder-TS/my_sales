import { AppDataSource } from '@shared/infra/typeorm/data-source';
import { Product } from '../entities/Product';
import { In } from 'typeorm';

interface IFindProducts {
  id: number;
}

export const productsRepositories = AppDataSource.getRepository(Product).extend(
  {
    async findByName(name: string): Promise<Product | null> {
      return await this.findOneBy({ name });
    },

    async findById(id: number): Promise<Product | null> {
      return await this.findOneBy({ id });
    },

    async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
      const productsId = products.map(product => product.id);

      const existentProducts = await this.find({
        where: { id: In(productsId) },
      });

      return existentProducts;
    },
  },
);
