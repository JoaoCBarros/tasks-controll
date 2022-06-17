import UserRepository from "../../../repository/UserRepository";
import { GetUserListQueryParams } from "./GetUserListDTO";

export default class GetUserList {
  constructor(private readonly userRepository: UserRepository) {}
  async execute(queryParams: GetUserListQueryParams) {
    const users = await this.userRepository.getUserList(queryParams);

    return users;
  }
}
