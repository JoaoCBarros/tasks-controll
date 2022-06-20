import JwtProvider from "../../../../infra/providers/JwtProvider";
import SessionRepositoryMemory from "../../../../infra/repositories/teste/SessionRepositoryMemory";
import UserRepositoryMemory from "../../../../infra/repositories/teste/UserRepositoryMemory";
import CreateUser from "../../user/CreateUser/CreateUser";
import CreateSession from "../CreateSession/CreateSession";
import VerifySession from "./VerifySession";

describe("VerifySession", () => {
  let authToken: string;
  let authUserId: string;
  let verifySession: VerifySession;
  beforeEach(async () => {
    const transparentTokenProvider = new JwtProvider();
    const sessionRepositoryMemory = new SessionRepositoryMemory(
      transparentTokenProvider
    );
    const userRepository = new UserRepositoryMemory();
    const createUser = new CreateUser(userRepository);
    await createUser.execute({
      email: "usuariotest@gmail.com",
      password: "123456",
      name: "Usuario Test",
    });
    const createSession = new CreateSession(
      sessionRepositoryMemory,
      userRepository
    );
    const { userId, token } = await createSession.execute(
      "usuariotest@gmail.com",
      "123456"
    );
    authToken = token;
    authUserId = userId;
    verifySession = new VerifySession(sessionRepositoryMemory);
  });
  it("Should autenticate with success", async () => {
    await expect(verifySession.execute(authToken)).resolves.toBe(true);
  });
  it("Should return a INVALID_AUTH_TOKEN Error", async () => {
    await expect(verifySession.execute(authToken)).rejects.toThrowError(
      "INVALID_AUTH_TOKEN"
    );
  });

  it("Should return a Invalid JWT Error", async () => {
    await expect(verifySession.execute("wrong-token")).rejects.toThrowError(
      "INVALID_TOKEN"
    );
  });
});
