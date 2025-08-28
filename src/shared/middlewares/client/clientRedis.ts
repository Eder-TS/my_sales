import { createClient } from 'redis';

// Criando um cliente específico para o Rate Limiter.
// Cliente Redis declarado separado do RateLimiter para poder
// fechar a conexão nos testes.
export const redisClient = createClient({
  url: `redis://${process.env.HOST_REDIS}:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_PASS || undefined,
});
