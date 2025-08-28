import { App } from 'supertest/types';
import { AppDataSource } from '../../src/shared/infra/typeorm/data-source';
import appPromise from '../../src/shared/infra/http/server';

// Para os testes de integração modifico a inicialização do server para que possa ser
// instanciado a partir de outro ponto, neste caso aqui...
export async function beforeTests() {
  await AppDataSource.initialize();
  const app = (await appPromise) as App;
  return app;
}

// ...então no final dos testes faço e exclusão do banco de dados.
export async function afterTests() {
  const entities = AppDataSource.entityMetadatas;

  for (const entity of entities) {
    const repository = AppDataSource.getRepository(entity.name);

    await repository.query(`DELETE FROM ${entity.tableName}`);
  }

  await AppDataSource.destroy();

  (await appPromise).close();
}
