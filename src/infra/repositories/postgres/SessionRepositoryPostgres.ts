import Session from "../../../core/entities/Session/Session";
import SessionRepository from "../../../core/repository/SessionRepository";

export default class SessionRepositoryPostgres implements SessionRepository {
  createSession(email: string, password: string): Promise<Session> {
    throw new Error("Method not implemented.");
  }
  verifyToken(token: string, userId: string): Promise<string | boolean> {
    throw new Error("Method not implemented.");
  }
  loggoutSession(userId: string): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
