import SessionRepositoryPostgres from "../../../infra/repositories/postgres/SessionRepositoryPostgres";
import UserRepositoryPostgres from "../../../infra/repositories/postgres/UserRepositoryPostgres";
import SessionController from "../../controllers/Session/SessionController";
import CreateSession from "../../usecases/session/CreateSession/CreateSession";

export const makeSessionController = (): SessionController => {
  const sessionRepository = new SessionRepositoryPostgres();
  const userRepository = new UserRepositoryPostgres();
  const createSession = new CreateSession(sessionRepository, userRepository);
  return new SessionController(createSession);
};
