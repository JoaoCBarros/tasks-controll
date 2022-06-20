import Env from "../../../core/config/envs";
import Session from "../../../core/entities/Session/Session";
import TransparentTokenProvider from "../../../core/providers/TransparentTokenProvider";
import SessionRepository from "../../../core/repository/SessionRepository";

export default class SessionRepositoryPostgres implements SessionRepository {
  constructor(
    private readonly transparentTokenProvider: TransparentTokenProvider
  ) {}
  async createSession(email: string, userId: string): Promise<Session> {
    const token = await this.transparentTokenProvider.generateTransparentToken(
      userId,
      Env.getEnv("SESSION_EXPIRES_NORMAL")
    );

    return {
      email: email,
      userId: userId,
      token: token,
    };
  }
  verifyToken(token: string, userId: string): Promise<string | boolean> {
    throw new Error("Method not implemented.");
  }
  loggoutSession(userId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
