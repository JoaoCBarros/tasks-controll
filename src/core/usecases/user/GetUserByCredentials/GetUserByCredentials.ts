import UserRepository from "../../../repository/UserRepository";
import { GetUserByCredentialsRequest } from "./GetUserByCredentialsDTO";

export default class GetUserByCredentials {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: GetUserByCredentialsRequest) {
    const user = await this.userRepository.getByUserCredentials(
      data.email,
      data.password
    );

    return user;
  }
}
