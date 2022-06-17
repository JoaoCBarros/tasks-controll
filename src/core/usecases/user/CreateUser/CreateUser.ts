import User from "../../../entities/User/User";
import UserRepository from "../../../repository/UserRepository";
import { v4 as uuidv4 } from "uuid";

export default class CreateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: User) {
    const userId = uuidv4();
    const user = await this.userRepository.registerUse({
      ...data,
      id: userId,
    });

    return user;
  }
}
