import Env from "../../../core/config/envs";
import Session from "../../../core/entities/Session/Session";
import User from "../../../core/entities/User/User";
import TransparentTokenProvider from "../../../core/providers/TransparentTokenProvider";
import SessionRepository from "../../../core/repository/SessionRepository";

export default class SessionRepositoryMemory implements SessionRepository {
  constructor(
    private readonly transparentTokenProvider: TransparentTokenProvider
  ) {}
  async verifyToken(token: string, userId: string): Promise<string | boolean> {
    try {
      const userId = await this.transparentTokenProvider.verifyTransparentToken(
        token
      );
      return userId;
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async createSession(email: string, userId: string): Promise<Session> {
    const token = await this.transparentTokenProvider.generateTransparentToken(
      userId,
      Env.getEnv("SESSION_EXPIRES_NORMAL")
    );

    return {
      email: email,
      userId: "any_user_id",
      token: token,
    };
  }
  loggoutSession(userId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
