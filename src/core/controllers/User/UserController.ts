import { CreateUserRequest } from "./UserControllerDTO";
import CreateUser from "../../usecases/user/CreateUser/CreateUser";
export default class UserController {
  constructor(private readonly createUser: CreateUser) {}
  async create({ body }: CreateUserRequest) {
    const { name, password, email } = body;
    return await this.createUser.execute({
      name,
      password,
      email,
    });
  }
}
