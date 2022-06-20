import User from "../../../core/entities/User/User";
import UserRepository from "../../../core/repository/UserRepository";
import { GetUserListQueryParams } from "../../../core/usecases/user/GetUserList/GetUserListDTO";
import { AppDataSource } from "../../database/data-source";
import UserModel from "../../database/entity/User";

export default class UserRepositoryPostgres implements UserRepository {
  registerUse(data: User): Promise<User> {
    throw new Error("Method not implemented.");
  }
  async getByUserCredentials(email: string, password: string): Promise<User> {
    const user = await AppDataSource.manager.findOneBy(UserModel, {
      email: email,
      password: password,
    });

    return user;
  }
  getUserList(queryParams?: GetUserListQueryParams): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
}
