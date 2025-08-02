import { hash } from 'bcrypt';
import { userMock } from '../domain/factories/userFactory';
import FakeUsersRepositories from '../domain/repositories/fake/FakeUsersRepositories';
import CreateUserService from './CreateUserService';
import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import bcrypt from 'bcrypt';

// Ferramenta do Jest para mockar coisas como o bcrypt.
jest.mock('bcrypt', () => ({
  // Aqui digo o quê do bcrypt vai ser mockado
  hash: jest.fn(),
}));

let fakeUsersRepositories: FakeUsersRepositories;
let createUserService: CreateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUsersRepositories = new FakeUsersRepositories();
    createUserService = new CreateUserService(fakeUsersRepositories);
  });

  it('should be able to create a new user', async () => {
    // O teste abaixo, apesar de parecer simples e eficiente, está rodando o hash do bcrypt,
    // ferindo o princípio de isolamento e testando uma biblioteca de terceiro.
    // Esta função hash() deverá ser "mockada".
    // const user = await createUserService.execute(userMock);
    // expect(user).toHaveProperty('id');
    // expect(user.email).toBe(userMock.email);

    // Digo para o Jest retornar um valor dado quando hash for chamado.
    (hash as jest.Mock).mockReturnValue('hashed-password');

    const user = await createUserService.execute(userMock);

    expect(user).toHaveProperty('id');
    expect(user.email).toBe(userMock.email);
  });

  it('should not be able to create a new user with email that is already exists', async () => {
    (hash as jest.Mock).mockReturnValue('hashed-password');

    await createUserService.execute(userMock);

    await expect(createUserService.execute(userMock)).rejects.toBeInstanceOf(
      AppError,
    );
  });

  it('should be able to hash given password', async () => {
    // Aqui usando o spyOn para ver ver se chama a função de hash.
    const hashSpy = jest
      .spyOn(bcrypt, 'hash')
      .mockImplementation(() => Promise.resolve('hashed-password'));

    await createUserService.execute(userMock);

    // Para validar espero que na execução da função dada tenha os valores passados.
    await expect(hashSpy).toHaveBeenCalledWith(userMock.password, 10);
  });
});
