import { AppDataSource } from '../src/shared/infra/typeorm/data-source';
import { App } from 'supertest/types';
import appPromise from '../src/shared/infra/http/server';
import request from 'supertest';

describe('Create User', () => {
  let app: App;

  // Para os testes de integração modifico a inicialização do server para que possa ser
  // instanciado a partir de outro ponto, neste caso aqui...
  beforeAll(async () => {
    await AppDataSource.initialize();
    app = (await appPromise) as App;
  });

  // ...então no final dos testes faço e exclusão do banco de dados.
  afterAll(async () => {
    const entities = AppDataSource.entityMetadatas;

    for (const entity of entities) {
      const repository = AppDataSource.getRepository(entity.name);

      await repository.query(`DELETE FROM ${entity.tableName}`);
    }

    await AppDataSource.destroy();
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
