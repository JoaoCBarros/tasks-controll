import { DateTime } from "ts-luxon";
import { TTaskStatus } from "../../../entities/Task/Dto/TaskDto";

export interface GetTasksListDTO {
  search?: string;
  userId?: string;
  startDate?: DateTime | Date;
  endDate?: DateTime | Date;
}

export interface TasksListReponseDTO {
  id: string;
  createdAt: string;
  expiresAt: string;
  status: TTaskStatus;
  userId: string;
}
