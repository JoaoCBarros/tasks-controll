import UserController from "../../controllers/User/UserController";
import UserRepositoryPostgres from "../../../infra/repositories/postgres/UserRepositoryPostgres";
import CreateUser from "../../usecases/user/CreateUser/CreateUser";
export const makeUserController = (): UserController => {
  const userRepository = new UserRepositoryPostgres();
  const createUser = new CreateUser(userRepository);

  return new UserController(createUser);
};
