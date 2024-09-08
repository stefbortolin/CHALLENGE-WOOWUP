import { User } from '../domain/entities/User';
import { UserRepository } from '../repositories/UserRepository';

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