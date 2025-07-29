import AppError from '@shared/errors/AppError';
import { customerMock } from '../domain/factories/customerFactory';
import FakeCustomerRepositories from '../domain/repositories/fakes/FakeCustomerRepositories';
import DeleteCustomerService from './DeleteCustomerService';

let fakeCustomerRepositories: FakeCustomerRepositories;
let deleteCustomerService: DeleteCustomerService;

describe('DeleteCustomerService', () => {
  beforeEach(() => {
    fakeCustomerRepositories = new FakeCustomerRepositories();
    deleteCustomerService = new DeleteCustomerService(fakeCustomerRepositories);
  });

  it('should delete existent customer', async () => {
    const customer = await fakeCustomerRepositories.create(customerMock);

    const idString = String(customer.id);
    await deleteCustomerService.execute({ id: idString });

    await expect(
      fakeCustomerRepositories.findById(customer.id),
      // resolves é usado devido a Promise.
    ).resolves.toBeNull();
  });

  it('should not be able to delete inexistent customer', async () => {
    await expect(
      deleteCustomerService.execute({ id: '1' }),
      // rejects pois a Promise deve ser rejeitada.
    ).rejects.toBeInstanceOf(AppError);
  });
});
