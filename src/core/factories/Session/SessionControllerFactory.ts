import JwtProvider from "../../../infra/providers/JwtProvider";
import SessionRepositoryPostgres from "../../../infra/repositories/postgres/SessionRepositoryPostgres";
import UserRepositoryPostgres from "../../../infra/repositories/postgres/UserRepositoryPostgres";
import SessionController from "../../controllers/Session/SessionController";
import CreateSession from "../../usecases/session/CreateSession/CreateSession";

export const makeSessionController = (): SessionController => {
  const transparentTokenProvider = new JwtProvider();
  const sessionRepository = new SessionRepositoryPostgres(
    transparentTokenProvider
  );
  const userRepository = new UserRepositoryPostgres();
  const createSession = new CreateSession(sessionRepository, userRepository);
  return new SessionController(createSession);
};
