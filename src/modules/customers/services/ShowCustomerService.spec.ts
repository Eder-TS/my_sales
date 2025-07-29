import AppError from '@shared/errors/AppError';
import { customerMock } from '../domain/factories/customerFactory';
import FakeCustomerRepositories from '../domain/repositories/fakes/FakeCustomerRepositories';
import ShowCustomerService from './ShowCustomerService';

let fakeCustomerRepositories: FakeCustomerRepositories;
let showCustomerService: ShowCustomerService;

describe('ShowCustomerService', () => {
  beforeEach(() => {
    fakeCustomerRepositories = new FakeCustomerRepositories();
    showCustomerService = new ShowCustomerService(fakeCustomerRepositories);
  });

  it('should return a customer with given id', async () => {
    const customer = await fakeCustomerRepositories.create(customerMock);

    const idString = String(customer.id);
    await expect(
      showCustomerService.execute({ id: idString }),
    ).resolves.toMatchObject({
      id: customer.id,
      name: customer.name,
      email: customer.email,
    });
  });
  it('should thrown a error by not found customer with given id', async () => {
    await expect(
      showCustomerService.execute({ id: '1' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
