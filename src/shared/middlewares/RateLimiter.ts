import AppError from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import { createClient } from 'redis';

// Criando um cliente específico para o Rate Limiter.
const redisClient = createClient({
  url: `redis://${process.env.HOST_REDIS}:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_PASS || undefined,
});

redisClient.connect().catch(console.error);

// O Rate Limiter irá limitar as chamadas (5 a cada 5 segundos neste caso)
// para evitar ataque hacker de força bruta à API.
const limiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'ratelimit',
  points: 5,
  duration: 5,
});

export default async function RateLimiter(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await limiter.consume(request.ip as string);
    console.log('bosta');
    return next();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    throw new AppError('Too many requests.', 429);
  }
}
