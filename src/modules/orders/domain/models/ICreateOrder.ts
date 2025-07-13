import { Product } from '@modules/products/infra/database/entities/Product';

export interface ICreateOrder {
  customerId: string;
  products: Product[];
}
