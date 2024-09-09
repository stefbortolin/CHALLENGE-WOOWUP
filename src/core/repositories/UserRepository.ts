import { User } from "../domain/entities/User";

// Repositorio para los usuarios, al igual que los demas repositorios trabajan en memoria directo, es ideal para luego implementar una conexion a base de datos y no afectar el resto del codigo.
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