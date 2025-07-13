import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { Secret, verify } from 'jsonwebtoken';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default class AuthMiddleware {
  static execute(
    request: Request,
    response: Response,
    next: NextFunction,
  ): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) throw new AppError('JWT token is missing.', 401);

    // Primeiro item do array é vazio pois a palavra Bearer não me interessa.
    const [, token] = authHeader.split(' ');

    try {
      const decodedToken = verify(token, process.env.APP_SECRET as Secret);
      const { sub } = decodedToken as ITokenPayload;

      const subNumber = Number(sub);
      request.user = { id: subNumber };

      return next();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new AppError('Invalid JWT token', 401);
    }
  }
}
