import { User } from '../domain/entities/User';
import { UserRepository } from '../repositories/UserRepository';

// Use case para registrar un usuario, se encarga de verificar que no exista un usuario con el mismo nombre de usuario y en caso de que no exista lo crea utilizando el repository.
export class RegisterUserUseCase {
    private userRepository: UserRepository;

    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    execute(username: string): User {
        const existingUser = this.userRepository.findByUsername(username);

        if (existingUser) {
            throw new Error('User already exists');
        }

        const newUser = new User(username);
        this.userRepository.save(newUser);
        return newUser;
    }
}