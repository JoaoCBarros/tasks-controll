import UserRepository from "../../../repository/UserRepository";
import { GetUserByCredentialsRequest } from "./GetUserByFieldDTO";

export default class GetUserByField {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: GetUserByCredentialsRequest) {
    const user = await this.userRepository.getUserByField(
      data.email,
      data.password
    );

    return user;
  }
}
