import { User } from "../../domain/entities/User";

export interface IUserRepository {
    save(user: User): void;

    findByUsername(username: string): User | null;

    getUsers(): User[];
}