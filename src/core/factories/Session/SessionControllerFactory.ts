import JwtProvider from "../../../infra/providers/JwtProvider";
import SessionRepositoryPostgres from "../../../infra/repositories/postgres/SessionRepositoryPostgres";
import UserRepositoryPostgres from "../../../infra/repositories/postgres/UserRepositoryPostgres";
import SessionController from "../../controllers/Session/SessionController";
import CreateSession from "../../usecases/session/CreateSession/CreateSession";
import VerifySession from "../../usecases/session/VerifySession/VerifySession";

export const makeSessionController = (): SessionController => {
  const transparentTokenProvider = new JwtProvider();
  const sessionRepository = new SessionRepositoryPostgres(
    transparentTokenProvider
  );
  const userRepository = new UserRepositoryPostgres();
  const createSession = new CreateSession(sessionRepository, userRepository);
  const verifySession = new VerifySession(sessionRepository);
  return new SessionController(createSession, verifySession);
};
