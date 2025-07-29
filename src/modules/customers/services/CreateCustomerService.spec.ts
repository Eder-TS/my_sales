import AppError from '@shared/errors/AppError';
import FakeCustomerRepositories from '../domain/repositories/fakes/FakeCustomerRepositories';
import CreateCustomerService from './CreateCustomerService';
import { customerMock } from '../domain/factories/customerFactory';

let fakeCustomerRepositories: FakeCustomerRepositories;
let createCustomerService: CreateCustomerService;

describe('CreateCustomerService', () => {
  // Usando o beforeEach para diminuir a repetição de código.
  // Também posso criar factories para instanciar o customer que será
  // usado em vários testes.
  beforeEach(() => {
    fakeCustomerRepositories = new FakeCustomerRepositories();
    createCustomerService = new CreateCustomerService(fakeCustomerRepositories);
  });

  it('should be able to create a new customer', async () => {
    const customer = await createCustomerService.execute(customerMock);

    expect(customer).toHaveProperty('id');
    expect(customer.email).toBe('teste@email.com');
  });

  it('should not be able to create a new customer with email that is already in use', async () => {
    // Para testar o throw de customer existente, instancio um novo customer...
    await createCustomerService.execute(customerMock);

    // ...e no expect tento instanciá-lo novamente, esperando o erro.
    await expect(
      createCustomerService.execute(customerMock),
    ).rejects.toBeInstanceOf(AppError);
  });
});
