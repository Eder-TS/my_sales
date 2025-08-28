import request from 'supertest';
import ProductsRepositories from '../src/modules/products/infra/database/repositories/ProductsRepositories';
import CustomersRepositories from '../src/modules/customers/infra/database/repositories/CustomerRepositories';
import { productMock } from '../src/modules/products/domain/factories/productFactory';
import { customerMock } from '../src/modules/customers/domain/factories/customerFactory';
import { Product } from '../src/modules/products/infra/database/entities/Product';
import { Customer } from '../src/modules/customers/infra/database/entities/Customer';
import app from '../src/shared/infra/http/app';
import { AppDataSource } from '../src/shared/infra/typeorm/data-source';
import { redisClient } from '../src/shared/middlewares/client/clientRedis';

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(() => '1'),
}));

let productsRepositories: ProductsRepositories;
let customersRepositories: CustomersRepositories;

describe('Create order', () => {
  let product: Product;
  let customer: Customer;

  beforeAll(async () => {
    await AppDataSource.initialize();

    productsRepositories = new ProductsRepositories();
    customersRepositories = new CustomersRepositories();

    product = productsRepositories.create(productMock);
    await productsRepositories.save(product);

    customer = await customersRepositories.create(customerMock);
  });

  afterAll(async () => {
    await AppDataSource.query('DELETE FROM orders_products');
    await AppDataSource.query('DELETE FROM orders');
    await AppDataSource.query('DELETE FROM products');
    await AppDataSource.query('DELETE FROM customers');

    await AppDataSource.destroy();
    await redisClient.quit();
  });

  it('should be able to create a new order', async () => {
    const response = await request(app)
      .post('/orders')
      .set('Authorization', 'auth')
      .send({
        customerId: String(customer.id),
        products: [{ id: product.id, quantity: 13 }],
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
  });

  it('should not be able to create a new order with wrong customer', async () => {
    const response = await request(app)
      .post('/orders')
      .set('Authorization', 'auth')
      .send({
        customerId: '1',
        products: [{ id: product.id, quantity: 13 }],
      });

    expect(response.status).toBe(400);
    expect(response).toHaveProperty('text');
  });

  //it('should not be able to create a new order with inexistent product');
});
