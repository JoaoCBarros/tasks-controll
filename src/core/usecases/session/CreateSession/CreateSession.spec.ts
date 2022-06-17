import JwtProvider from "../../../../infra/providers/JwtProvider";
import SessionRepositoryMemory from "../../../../infra/repositories/SessionRepositoryMemory";
import UserRepositoryMemory from "../../../../infra/repositories/UserRepositoryMemory";
import TransparentTokenProvider from "../../../providers/TransparentTokenProvider";
import CreateUser from "../../user/CreateUser/CreateUser";
import CreateSession from "./CreateSession";
require("dotenv").config();

const sum = async (numberOne, numberTwo) => {
  throw new Error("ERROR");
};
describe("CreateSession", () => {
  let createSession: CreateSession;
  let transparentTokenProvider: TransparentTokenProvider;
  beforeEach(async () => {
    transparentTokenProvider = new JwtProvider();
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
    createSession = new CreateSession(sessionRepositoryMemory, userRepository);
  });

  it("Shoud create a session with JWT Token", async () => {
    const { token, email, userId } = await createSession.execute(
      "usuariotest@gmail.com",
      "123456"
    );

    expect(token && typeof token === "string").toBe(true);
    expect(email).toBe("usuariotest@gmail.com");
    expect(userId && typeof userId === "string").toBe(true);
  });

  it("Should return a Valid JWT", async () => {
    const { token, email, userId } = await createSession.execute(
      "usuariotest@gmail.com",
      "123456"
    );

    const authId = await transparentTokenProvider.verifyTransparentToken(token);

    expect(authId).toBe(userId);
  });

  it("Should return a Invalid JWT Error", async () => {
    const { token, email, userId } = await createSession.execute(
      "usuariotest@gmail.com",
      "123456"
    );

    await expect(
      transparentTokenProvider.verifyTransparentToken("wrong-token")
    ).rejects.toThrowError("INVALID_TOKEN");
  });

  it("Should return a TokenExpired Error", async () => {
    const { token, email, userId } = await createSession.execute(
      "usuariotest@gmail.com",
      "123456"
    );

    await expect(
      transparentTokenProvider.verifyTransparentToken("wrong-token")
    ).rejects.toThrowError("INVALID_TOKEN");
  });

  it("Should return a INVALID_CREDENTIALS Error", async () => {
    await expect(
      createSession.execute("usuariotest@gmail.com", "12345677")
    ).rejects.toThrowError("INVALID_CREDENTIALS");
  });
});
