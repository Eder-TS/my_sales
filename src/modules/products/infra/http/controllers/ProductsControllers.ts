import { Request, Response } from 'express';
import ListProductsService from '../../../services/ListProductsService';
import ShowProductService from '../../../services/ShowProductService';
import CreateProductService from '../../../services/CreateProductService';
import UpdateProductService from '../../../services/UpdateProductService';
import DeleteProductService from '../../../services/DeleteProductService';
import { container } from 'tsyringe';

export default class ProductsControllers {
  async list(request: Request, response: Response): Promise<Response> {
    const listProductsService = container.resolve(ListProductsService);
    const products = await listProductsService.execute();
    return response.json(products);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const id = request.params.id;
    const showProductService = container.resolve(ShowProductService);
    const product = await showProductService.execute({ id });
    return response.json(product);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity } = request.body;
    const createProductService = container.resolve(CreateProductService);
    const product = await createProductService.execute({
      name,
      price,
      quantity,
    });
    return response.json(product);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const id = request.params.id;
    const { name, price, quantity } = request.body;
    const updateProductService = container.resolve(UpdateProductService);
    const product = await updateProductService.execute({
      id,
      name,
      price,
      quantity,
    });
    return response.json(product);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const id = request.params.id;
    const deleteProductService = container.resolve(DeleteProductService);
    await deleteProductService.execute({ id });
    return response.status(204).send([]);
  }
}
