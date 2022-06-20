import User from "../entities/User/User";
import { GetUserListQueryParams } from "../usecases/user/GetUserList/GetUserListDTO";

export default interface UserRepository {
  registerUse(data: User): Promise<User>;
  getUserByField(field: string, value: string): Promise<User>;
  getUserList(queryParams?: GetUserListQueryParams): Promise<User[]>;
}
