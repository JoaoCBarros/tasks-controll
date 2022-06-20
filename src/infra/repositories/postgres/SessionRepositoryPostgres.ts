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
  async verifyToken(token: string): Promise<string> {
    try {
      const userId = await this.transparentTokenProvider.verifyTransparentToken(
        token
      );
      return userId;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  loggoutSession(userId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
