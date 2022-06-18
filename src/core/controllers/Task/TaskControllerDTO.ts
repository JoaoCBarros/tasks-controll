import { DateTime } from "ts-luxon";
import { GetTasksListQueryParams } from "../../entities/Task/Dto/TaskDto";
import { ControllerRequest } from "../DTO/RequestControllersDTO";

export interface FinishTaskRequest extends ControllerRequest {
  params?: FinishTaskParams;
}

export interface FinishTaskParams {
  taskId: string;
}

export interface CreateTaskRequest extends ControllerRequest {
  body?: CreateTaskBody;
}

export interface TasksListRequest extends ControllerRequest {
  queryStrings?: GetTasksListQueryParams;
}

interface CreateTaskBody {
  title: string;
  description: string;
  expiresAt: DateTime;
}

export interface TaskControllerResponse {}
