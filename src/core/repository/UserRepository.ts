import User from "../entities/User/User";
import { GetUserListQueryParams } from "../usecases/user/GetUserList/GetUserListDTO";

export default interface UserRepository {
  registerUse(data: User): Promise<User>;
  getByUserCredentials(email: string, password: string): Promise<User>;
  getUserList(queryParams?: GetUserListQueryParams): Promise<User[]>;
}
