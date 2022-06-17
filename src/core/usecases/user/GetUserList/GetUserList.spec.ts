import UserRepositoryMemory from "../../../../infra/repositories/UserRepositoryMemory";
import CreateUser from "../CreateUser/CreateUser";
import GetUserList from "./GetUserList";

describe("GetUserList", () => {
  let userRepository: UserRepositoryMemory;
  beforeEach(async () => {
    userRepository = new UserRepositoryMemory();
    const createUser = new CreateUser(userRepository);
    await createUser.execute({
      email: "joao.teste@gmail.com",
      password: "123123",
      name: "João Test",
    });
    await createUser.execute({
      email: "joao.teste2@gmail.com",
      password: "123123",
      name: "João Test 2",
    });
    await createUser.execute({
      email: "joao.teste3@gmail.com",
      password: "123123",
      name: "João Test 3",
    });
  });
  it("Should get 3 users in UserList", async () => {
    const getUserList = new GetUserList(userRepository);
    const users = await getUserList.execute();

    expect(users.length).toBe(3);
    expect(users[0].email).toBe("joao.teste@gmail.com");
    expect(users[1].email).toBe("joao.teste2@gmail.com");
    expect(users[2].email).toBe("joao.teste3@gmail.com");
  });
});
