import SessionRepository from "../../../repository/SessionRepository";

export default class CreateSession {
  constructor(private readonly sessionRepository: SessionRepository) {}

  async execute(email: string, password: string) {
    return await this.sessionRepository.createSession(email, password);
  }
}
