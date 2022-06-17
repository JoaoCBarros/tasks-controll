import JwtProvider from "../../../../infra/providers/JwtProvider";
import SessionRepositoryMemory from "../../../../infra/repositories/SessionRepositoryMemory";
import TransparentTokenProvider from "../../../providers/TransparentTokenProvider";
import CreateSession from "./CreateSession";
const sum = async (numberOne, numberTwo) => {
  throw new Error("ERROR");
};
describe("CreateSession", () => {
  let createSession: CreateSession;
  let transparentTokenProvider: TransparentTokenProvider;
  beforeEach(() => {
    transparentTokenProvider = new JwtProvider();
    const sessionRepositoryMemory = new SessionRepositoryMemory(
      transparentTokenProvider
    );
    createSession = new CreateSession(sessionRepositoryMemory);
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
});
