import { User } from "../domain/entities/User";

export class UserRepository {
    private users: User[] = [];

    save(user: User): void {
        this.users.push(user);
    }

    findByUsername(username: string): User | null {
        return this.users.find(user => user.getUsername() === username) || null;
    }

    getUsers(): User[] {
        return this.users;
    }
}