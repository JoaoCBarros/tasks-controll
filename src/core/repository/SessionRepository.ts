import Session from "../entities/Session/Session";

export default interface SessionRepository {
  createSession(email: string, userId: string): Promise<Session>;
  verifyToken(token: string): Promise<string>;
  loggoutSession(userId: string): Promise<void>;
}
