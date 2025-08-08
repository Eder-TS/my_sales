import AppError from '@shared/errors/AppError';
import { NextFunction, Response, Request, ErrorRequestHandler } from 'express';

export default class ErrorHandlerMiddleware {
  // Tipagem explícita de HandleError para não haver 'reclamações' do Typescript.
  public static HandleError: ErrorRequestHandler = (
    error: Error,
    // O underscore serve para sinalizar que a variável não é utilizada.
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) => {
    console.log(error);
    if (error instanceof AppError) {
      res.status(error.statusCode).json({
        type: 'error',
        message: error.message,
      });
      return;
    }
    res.status(500).json({
      type: 'error',
      message: 'Internal server error.',
    });
    return;
  };
}
