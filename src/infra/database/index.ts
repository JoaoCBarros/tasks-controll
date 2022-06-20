import { AppDataSource } from "../database/data-source";
import User from "../database/entity/User";
import { randomUUID } from "crypto";

AppDataSource.initialize()
  .then(async () => {
    const user = new User();
    user.id = randomUUID();
    user.name = "User First";
    user.email = "joao.pedro@teste.com";
    user.password = "123123a";
    await AppDataSource.manager.save(user);
    console.log("Saved a new user with id: " + user.id);
  })
  .catch((error) => console.log(error));
