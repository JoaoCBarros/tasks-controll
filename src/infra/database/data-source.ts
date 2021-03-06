import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import User from "./entity/User";
import Env from "../../core/config/envs";
import Task from "./entity/Task";

const AppDataSource = new DataSource({
  type: "postgres",
  url: Env.getEnv("DATABASE_URL"),
  host: Env.getEnv("DB_HOST"),
  port: Env.getEnv("DB_PORT"),
  username: Env.getEnv("DB_USER"),
  password: Env.getEnv("DB_PASSWORD"),
  database: Env.getEnv("DB_NAME"),
  synchronize: true,
  logging: false,
  entities: [User, Task],
  migrations: [],
  subscribers: [],
  // ssl: Env.getEnv("ENV_MODE") === "production" ? true : false,
  extra:
    Env.getEnv("ENV_MODE") === "production"
      ? {
          ssl: { rejectUnauthorized: false },
        }
      : {},
});

AppDataSource.initialize()
  .then(async () => {
    // const user = new User();
    // user.id = randomUUID();
    // user.name = "User First";
    // user.email = "joao.pedro@teste.com";
    // user.password = "123123";
    // await AppDataSource.manager.save(user);
    // console.log("Saved a new user with id: " + user.id);
  })
  .catch((error) => console.log(error));

export { AppDataSource };
