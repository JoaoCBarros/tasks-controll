import { DateTime } from "ts-luxon";
import { AuthRequest } from "../../entities/Session/DTO/SessionDTO";
import { GetTasksListQueryParams } from "../../entities/Task/Dto/TaskDto";

export interface TaskControllerRequest {
  params?: object;
  body?: object;
  queryStrings?: object;
  auth?: AuthRequest;
}

export interface FinishTaskRequest extends TaskControllerRequest {
  params?: FinishTaskParams;
}

export interface FinishTaskParams {
  taskId: string;
}

export interface CreateTaskRequest extends TaskControllerRequest {
  body?: CreateTaskBody;
}

export interface TasksListRequest extends TaskControllerRequest {
  queryStrings?: GetTasksListQueryParams;
}

interface CreateTaskBody {
  title: string;
  description: string;
  expiresAt: DateTime;
}

export interface TaskControllerResponse {}
