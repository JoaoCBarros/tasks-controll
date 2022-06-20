import SessionRepository from "../../../repository/SessionRepository";
import UserRepository from "../../../repository/UserRepository";

export default class CreateSession {
  constructor(
    private readonly sessionRepository: SessionRepository,
    private readonly userRepository: UserRepository
  ) {}

  async execute(email: string, password: string) {
    const user = await this.userRepository.getByUserCredentials(
      email,
      password
    );
    if (!user) {
      throw new Error("INVALID_CREDENTIALS");
    }

    return await this.sessionRepository.createSession(user.email, user.id);
  }
}
