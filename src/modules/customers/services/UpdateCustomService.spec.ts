import { customerMock } from '../domain/factories/customerFactory';
import { ICustomer } from '../domain/models/ICustomer';
import FakeCustomerRepositories from '../domain/repositories/fakes/FakeCustomerRepositories';
import UpdateCustomerService from './UpdateCustomerService';

let fakeCustomerRepositories: FakeCustomerRepositories;
let updateCustomerService: UpdateCustomerService;
let customer: ICustomer;
const updatedName = 'updatedName';
const updatedEmail = 'updatedEmail';

describe('UpdateCustomerService', () => {
  beforeEach(async () => {
    fakeCustomerRepositories = new FakeCustomerRepositories();
    updateCustomerService = new UpdateCustomerService(fakeCustomerRepositories);
    customer = await fakeCustomerRepositories.create(customerMock);
  });

  it('should update an existent customer', async () => {
    const idString = String(customer.id);
    const updatedCustomer = await updateCustomerService.execute({
      id: idString,
      name: updatedName,
      email: updatedEmail,
    });

    expect(updatedCustomer).toHaveProperty(['id'], customer.id);
    expect(updatedCustomer).toHaveProperty(['name'], updatedName);
    expect(updatedCustomer).toHaveProperty(['email'], updatedEmail);
  });

  it("should not update a customer by don't found it", async () => {
    const idToSearch = String(customer.id + 1);

    await expect(
      updateCustomerService.execute({
        id: idToSearch,
        name: updatedName,
        email: updatedEmail,
      }),
    ).rejects.toHaveProperty(['message'], 'Customer not found.');
  });

  it('should not update a customer by email that is already exists', async () => {
    const idString = String(customer.id);
    const otherCustomer = await fakeCustomerRepositories.create({
      name: 'otherCustomer',
      email: 'other@email.com',
    });

    await expect(
      updateCustomerService.execute({
        id: idString,
        name: updatedName,
        email: otherCustomer.email,
      }),
    ).rejects.toHaveProperty(
      ['message'],
      'There is already one customer with this email.',
    );
  });
});
