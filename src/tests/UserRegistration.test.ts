//Se pueden registrar usuarios que recibirán alertas. 

import { User } from "../core/domain/entities/User";
import { IUserRepository } from "../core/repositories/interfaces/IUserRepository";
import { UserRepository } from "../core/repositories/UserRepository";
import { RegisterUserUseCase } from "../core/use-cases/RegisterUserUseCase";

describe('RegisterUserUseCase', () => {
  let userRepository: IUserRepository;
  let registerUserUseCase: RegisterUserUseCase;

  beforeEach(() => {
    userRepository = new UserRepository();
    registerUserUseCase = new RegisterUserUseCase(userRepository);
  });

  it('should register a new user successfully', () => {
    const username = 'user';
    const newUser = registerUserUseCase.execute(username);

    expect(newUser).toBeInstanceOf(User);
    expect(newUser.getUsername()).toBe(username);
    expect(userRepository.getUsers()).toContain(newUser);
  });

  it('should throw an error if the user already exists', () => {
    const username = 'user';
    registerUserUseCase.execute(username);

    expect(() => registerUserUseCase.execute(username)).toThrowError('User already exists');
  });
});
