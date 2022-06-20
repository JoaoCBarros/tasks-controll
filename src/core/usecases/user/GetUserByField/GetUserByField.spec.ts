import UserRepositoryMemory from "../../../../infra/repositories/teste/UserRepositoryMemory";
import CreateUser from "../CreateUser/CreateUser";
import GetUserByField from "./GetUserByField";

describe("GetUserByCredentials", () => {
  let userRepository: UserRepositoryMemory;
  beforeEach(async () => {
    userRepository = new UserRepositoryMemory();
    const createUser = new CreateUser(userRepository);
    await createUser.execute({
      email: "joao.teste@gmail.com",
      password: "123123",
      name: "João Test",
    });
  });
  it("Should get user by Credentials", async () => {
    const getUserByCredentials = new GetUserByField(userRepository);
    const user = await getUserByCredentials.execute({
      email: "joao.teste@gmail.com",
      password: "123123",
    });

    expect(user.email).toBe("joao.teste@gmail.com");
    expect(user.name).toBe("João Test");
    expect(user.password).toBe("123123");
  });
});
