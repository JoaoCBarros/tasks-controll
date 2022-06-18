import CreateSession from "../../usecases/session/CreateSession/CreateSession";
import { CreateSessionRequest } from "./SessionControllerDTO";

export default class SessionController {
  constructor(private readonly createSessionUseCase: CreateSession) {}

  async createSession({ body }: CreateSessionRequest) {
    const { email, password } = body;
    const session = await this.createSessionUseCase.execute(email, password);
    return session;
  }
}
