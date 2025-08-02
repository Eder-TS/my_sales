import { compare, hash } from 'bcrypt';
import FakeUsersRepositories from '../domain/repositories/fake/FakeUsersRepositories';
import SessionUserService from './SessionUserService';
import 'reflect-metadata';
import { loginMock, userMock } from '../domain/factories/userFactory';
import AppError from '@shared/errors/AppError';
import { invalid } from 'joi';

jest.mock('bcrypt', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

jest.mock('jsonwebtoken', () => ({
  // Posso já declarar o retorno da função.
  sign: jest.fn(() => 'fake-token'),
}));

let fakeUsersRepositories: FakeUsersRepositories;
let sessionUserService: SessionUserService;

describe('SessionUserService', () => {
  beforeEach(async () => {
    fakeUsersRepositories = new FakeUsersRepositories();
    sessionUserService = new SessionUserService(fakeUsersRepositories);

    (hash as jest.Mock).mockReturnValue('hashed-password');

    const user = await fakeUsersRepositories.create(userMock);
    await fakeUsersRepositories.save(user);
  });

  it('should craete a new session with given email and password', async () => {
    (compare as jest.Mock).mockReturnValue(true);

    const session = await sessionUserService.execute(loginMock);

    expect(session).toHaveProperty('token');
    expect(session.user.email).toBe(loginMock.email);
  });

  it('should not create a new session with invalid email', async () => {
    (compare as jest.Mock).mockReturnValue(true);
    const email = 'other@email.com';
    const password = loginMock.password;
    const invalidCredentials = { email, password };

    await expect(
      sessionUserService.execute(invalidCredentials),
    ).rejects.toBeInstanceOf(AppError);

    // Como a validação apenas por AppError não garante que ocorreu o throw no momento desejado,
    // verifico se compare NÃO foi chamada.
    expect(compare).not.toHaveBeenCalled();
  });

  it('should not be able to create a new session with invalid password', async () => {
    (compare as jest.Mock).mockReturnValue(false);
    const email = loginMock.email;
    const password = 'otherPassword';
    const invalidCredentials = { email, password };

    await expect(
      sessionUserService.execute(invalidCredentials),
    ).rejects.toBeInstanceOf(AppError);

    expect(compare).toHaveBeenCalled();
  });
});
