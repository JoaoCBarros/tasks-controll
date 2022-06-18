import { DateTime } from "ts-luxon";
import { AuthRequest } from "../entities/Session/DTO/SessionDTO";

export interface TaskControllerRequest {
  params?: object;
  body?: object;
  queryStrings?: object;
  auth?: AuthRequest;
}

export interface CreateTaskRequest extends TaskControllerRequest {
  body?: CreateTaskBody;
}

interface CreateTaskBody {
  title: string;
  description: string;
  expiresAt: DateTime;
}

export interface TaskControllerResponse {}
