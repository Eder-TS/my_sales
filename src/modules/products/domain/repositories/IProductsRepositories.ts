import { ICreateProduct } from '../models/ICreateProduct';
import { IProduct } from '../models/IProduct';
import { IUpdateProductQuantity } from '../models/IUpdateProductQuantity';

export interface IFindProducts {
  id: number;
}
export interface IProductsRepositories {
  findByName(name: string): Promise<IProduct | null>;
  findById(id: number): Promise<IProduct | null>;
  findAllByIds(products: IFindProducts[]): Promise<IProduct[]>;
  find(): Promise<IProduct[]>;
  create(data: ICreateProduct): IProduct;
  save(product: IProduct): Promise<IProduct>;
  delete(id: number): Promise<void>;
  updateQuantity(data: IUpdateProductQuantity[]): Promise<void>;
}
