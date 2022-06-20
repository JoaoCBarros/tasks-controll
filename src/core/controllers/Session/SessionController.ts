import CreateSession from "../../usecases/session/CreateSession/CreateSession";
import VerifySession from "../../usecases/session/VerifySession/VerifySession";
import { CreateSessionRequest } from "./SessionControllerDTO";

export default class SessionController {
  constructor(
    private readonly createSessionUseCase: CreateSession,
    private readonly verifySession: VerifySession
  ) {}

  async createSession({ body }: CreateSessionRequest) {
    const { email, password } = body;
    const session = await this.createSessionUseCase.execute(email, password);
    return session;
  }

  async verifyAuthSession(token: string): Promise<string> {
    const userId = await this.verifySession.execute(token);

    return userId;
  }
}
