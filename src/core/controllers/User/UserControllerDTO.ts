import { ControllerRequest } from "../DTO/RequestControllersDTO";
export interface CreateUserRequest extends ControllerRequest {
  body: CreateUserBody;
}

interface CreateUserBody {
  name: string;
  email: string;
  password: string;
}
