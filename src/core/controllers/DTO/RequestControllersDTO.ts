import { AuthRequest } from "../../entities/Session/DTO/SessionDTO";

export interface ControllerRequest {
  params?: object;
  body?: object;
  queryStrings?: object;
  auth?: AuthRequest;
}
