import AppError from '@shared/errors/AppError';
import { NextFunction, Response, Request } from 'express';

export default class ErrorHandlerMiddleware {
  public static HandleError(
    error: Error,
    // O underscore serve para sinalizar que a variável não é utilizada.
    _req: Request,
    res: Response,
    _next: NextFunction,
  ) {
    console.log(error);
    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        type: 'error',
        message: error.message,
      });
    }
    return res.status(500).json({
      type: 'error',
      message: 'Internal server error.',
    });
  }
}
