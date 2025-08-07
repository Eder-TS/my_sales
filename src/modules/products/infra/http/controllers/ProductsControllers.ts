import { Request, RequestHandler, Response } from 'express';
import ListProductsService from '../../../services/ListProductsService';
import ShowProductService from '../../../services/ShowProductService';
import CreateProductService from '../../../services/CreateProductService';
import UpdateProductService from '../../../services/UpdateProductService';
import DeleteProductService from '../../../services/DeleteProductService';
import { container } from 'tsyringe';

export default class ProductsControllers {
  public list: RequestHandler = async (
    request: Request,
    response: Response,
  ): Promise<void> => {
    const listProductsService = container.resolve(ListProductsService);
    const products = await listProductsService.execute();
    response.json(products);
  };

  public show: RequestHandler = async (
    request: Request,
    response: Response,
  ): Promise<void> => {
    const id = request.params.id;
    const showProductService = container.resolve(ShowProductService);
    const product = await showProductService.execute({ id });
    response.json(product);
  };

  public create: RequestHandler = async (
    request: Request,
    response: Response,
  ): Promise<void> => {
    const { name, price, quantity } = request.body;
    const createProductService = container.resolve(CreateProductService);
    const product = await createProductService.execute({
      name,
      price,
      quantity,
    });
    response.json(product);
  };

  public update: RequestHandler = async (
    request: Request,
    response: Response,
  ): Promise<void> => {
    const id = request.params.id;
    const { name, price, quantity } = request.body;
    const updateProductService = container.resolve(UpdateProductService);
    const product = await updateProductService.execute({
      id,
      name,
      price,
      quantity,
    });
    response.json(product);
  };

  public delete: RequestHandler = async (
    request: Request,
    response: Response,
  ): Promise<void> => {
    const id = request.params.id;
    const deleteProductService = container.resolve(DeleteProductService);
    await deleteProductService.execute({ id });
    response.status(204).send([]);
  };
}
