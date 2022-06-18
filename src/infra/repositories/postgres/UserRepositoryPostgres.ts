import User from "../../../core/entities/User/User";
import UserRepository from "../../../core/repository/UserRepository";
import { GetUserListQueryParams } from "../../../core/usecases/user/GetUserList/GetUserListDTO";

export default class UserRepositoryPostgres implements UserRepository {
  registerUse(data: User): Promise<User> {
    throw new Error("Method not implemented.");
  }
  getByUserCredentials(email: string, password: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  getUserList(queryParams?: GetUserListQueryParams): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
}
