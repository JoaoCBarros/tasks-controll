import Session from "../entities/Session/Session";

export default interface SessionRepository {
  createSession(email: string, userId: string): Promise<Session>;
  verifyToken(token: string, userId: string): Promise<string | boolean>;
  loggoutSession(userId: string): Promise<void>;
}
