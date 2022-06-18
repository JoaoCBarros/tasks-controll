import SessionRepository from "../../../repository/SessionRepository";

export default class VerifySession {
  constructor(private readonly sessionRespository: SessionRepository) {}
  async execute(token: string, userId: string) {
    const authId = await this.sessionRespository.verifyToken(token, userId);

    if (authId !== userId) {
      throw new Error("INVALID_AUTH_TOKEN");
    }

    return true;
  }
}
