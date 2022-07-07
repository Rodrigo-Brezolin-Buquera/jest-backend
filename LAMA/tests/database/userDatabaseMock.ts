import { UserRepository } from "../../src/business/UserRepository";
import { User, UserRole } from "../../src/model/User";

export class UserDatabaseMock implements UserRepository{
   async createUser(id: string, email: string, name: string, password: string, role: string): Promise<void> {
        
    }
   async getUserByEmail(email: string): Promise<User> {
        const user  = new User("ID", "NAME", "EMAIL@EMAIL>COM", "SENHA", UserRole.NORMAL)
        return user
    }
}