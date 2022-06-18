import { ControllerRequest } from "../DTO/RequestControllersDTO";

export interface CreateSessionRequest extends ControllerRequest {
  body: CreateSessionBody;
}

export interface CreateSessionBody {
  email: string;
  password: string;
}
