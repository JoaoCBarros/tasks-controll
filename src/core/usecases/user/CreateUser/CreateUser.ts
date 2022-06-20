import User from "../../../entities/User/User";
import UserRepository from "../../../repository/UserRepository";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
export default class CreateUser {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: User) {
    const userId = uuidv4();
    const salt = 10;
    const passwordHash = await bcrypt.hash(data.password, salt);

    const user = await this.userRepository.registerUse({
      ...data,
      id: userId,
      password: passwordHash,
    });

    return user;
  }
}
