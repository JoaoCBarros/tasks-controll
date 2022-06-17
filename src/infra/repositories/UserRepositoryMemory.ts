import User from "../../core/entities/User/User";
import UserRepository from "../../core/repository/UserRepository";
import { GetUserListQueryParams } from "../../core/usecases/user/GetUserList/GetUserListDTO";

export default class UserRepositoryMemory implements UserRepository {
  users: User[] = [];
  async registerUse(data: User): Promise<User> {
    this.users.push(data);
    return this.users.filter((item) => {
      return data.id === item.id;
    })[0];
  }
  async getByUserCredentials(email: string, password: string): Promise<User> {
    return this.users.filter((item) => {
      return item.email === email && item.password === password;
    })[0];
  }
  async getUserList(queryParams?: GetUserListQueryParams): Promise<User[]> {
    return this.users;
  }
}
