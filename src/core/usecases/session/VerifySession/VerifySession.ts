import SessionRepository from "../../../repository/SessionRepository";

export default class VerifySession {
  constructor(private readonly sessionRespository: SessionRepository) {}
  async execute(token: string) {
    const authId = await this.sessionRespository.verifyToken(token);
    return authId;
  }
}
