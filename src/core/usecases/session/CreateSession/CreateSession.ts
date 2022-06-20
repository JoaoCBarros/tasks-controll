import SessionRepository from "../../../repository/SessionRepository";
import UserRepository from "../../../repository/UserRepository";
import bcrypt from "bcrypt";
export default class CreateSession {
  constructor(
    private readonly sessionRepository: SessionRepository,
    private readonly userRepository: UserRepository
  ) {}

  async execute(email: string, password: string) {
    const user = await this.userRepository.getUserByField("email", email);

    if (!user) {
      throw new Error("INVALID_CREDENTIALS");
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new Error("INVALID_CREDENTIALS");
    }

    return await this.sessionRepository.createSession(user.email, user.id);
  }
}
