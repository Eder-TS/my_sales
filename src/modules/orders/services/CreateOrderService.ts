import { Product } from '@modules/products/database/entities/Product';
import { orderRepositories } from '../database/repositories/OrderRepositories';
import AppError from '@shared/errors/AppError';
import { productsRepositories } from '@modules/products/database/repositories/ProductsRepositories';
import { customerRepositories } from '@modules/customers/database/repositories/CustomerRepositories';
import { Order } from '../database/entities/Order';

interface ICreateOrder {
  customerId: string;
  products: Product[];
}

export default class CreateOrderService {
  async execute({ customerId, products }: ICreateOrder): Promise<Order> {
    const idToFind = Number(customerId);
    const customerExists = await customerRepositories.findById(idToFind);

    if (!customerExists)
      throw new AppError('Could not find any customer with given id.');

    const productsExists = await productsRepositories.findAllByIds(products);

    if (!productsExists)
      throw new AppError('Could not find any product with given ids.');

    const existsProductsIds = productsExists.map(product => product.id);

    // Verificando se há algum id que não corresponda a nenhum produto
    // e avisar em seguida.
    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id),
    );

    if (checkInexistentProducts.length)
      throw new AppError(
        `Could not find product ${checkInexistentProducts[0].id}.`,
        404,
      );

    const quantityAvailable = products.filter(product => {
      const verifyQuantity = productsExists.filter(
        productExist => productExist.id === product.id,
      );
      return verifyQuantity[0].quantity < product.quantity;
    });

    if (quantityAvailable.length)
      throw new AppError(
        `The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}`,
        409,
      );

    const serializedProducts = products.map(product => ({
      productId: product.id,
      quantity: product.quantity,
      price: productsExists.filter(p => p.id === product.id)[0].price,
    }));

    const order = await orderRepositories.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });

    // Atualizando quantidade no banco de dados.
    const { orderProduct } = order;
    const updateProductsQuantity = orderProduct.map(product => ({
      id: product.productId,
      quantity:
        productsExists.filter(p => p.id === product.productId)[0].quantity -
        product.quantity,
    }));
    await productsRepositories.save(updateProductsQuantity);

    return order;
  }
}
