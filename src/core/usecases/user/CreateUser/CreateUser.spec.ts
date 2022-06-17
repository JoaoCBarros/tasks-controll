import UserRepositoryMemory from "../../../../infra/repositories/UserRepositoryMemory";
import CreateUser from "./CreateUser";

describe("CreateUser", () => {
  it("Should create a user", async () => {
    const userRepository = new UserRepositoryMemory();
    const createUser = new CreateUser(userRepository);

    const user = await createUser.execute({
      email: "joao.teste@gmail.com",
      password: "123123",
      name: "João Test",
    });

    expect(user.email).toBe("joao.teste@gmail.com");
    expect(user.password).toBe("123123");
    expect(user.name).toBe("João Test");
  });
});
