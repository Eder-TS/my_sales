import request from 'supertest';
import app from '../src/shared/infra/http/app';
import { AppDataSource } from '../src/shared/infra/typeorm/data-source';
import { redisClient } from '../src/shared/middlewares/client/clientRedis';

describe('Create User', () => {
  beforeAll(async () => {
    await AppDataSource.initialize();
  });

  afterAll(async () => {
    await AppDataSource.query('DELETE FROM users');

    await AppDataSource.destroy();

    await redisClient.quit();

    // Deixo aqui ferramenta para depurar handlers abertos na finalização dos testes.
    // const handles = (process as any)._getActiveHandles() as unknown[];

    // console.log('>>> HANDLES ABERTOS:');
    // for (const h of handles) {
    //   if (h && typeof h === 'object') {
    //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    //     console.log((h as any).constructor?.name, h);
    //   }
    // }

    // // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // handles.forEach((h: any) => {
    //   if (h.constructor?.name === 'Socket') {
    //     console.log('>>> SOCKET ABERTO:', {
    //       local: h.localAddress + ':' + h.localPort,
    //       remote: h.remoteAddress + ':' + h.remotePort,
    //     });
    //   }
    // });
  });

  it('should be able to create a new user', async () => {
    const response = await request(app).post('/users').send({
      name: 'mogo',
      email: 'mogo@email.com',
      password: 'mogo',
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id');
    expect(response.body.email).toBe('mogo@email.com');
  });
});
