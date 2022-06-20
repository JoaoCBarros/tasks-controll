import User from "../../../core/entities/User/User";
import UserRepository from "../../../core/repository/UserRepository";
import { GetUserListQueryParams } from "../../../core/usecases/user/GetUserList/GetUserListDTO";
import { AppDataSource } from "../../database/data-source";
import UserModel from "../../database/entity/User";

export default class UserRepositoryPostgres implements UserRepository {
  async registerUse(data: User): Promise<User> {
    const user = new UserModel();
    user.password = data.password;
    user.name = data.name;
    user.email = data.email;
    user.id = data.id;

    await AppDataSource.manager.save(user);

    return user;
  }
  async getUserByField(field: string, value: string): Promise<User> {
    const user = await AppDataSource.manager.findOneBy(UserModel, {
      [field]: value,
    });

    return user;
  }
  getUserList(queryParams?: GetUserListQueryParams): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
}
