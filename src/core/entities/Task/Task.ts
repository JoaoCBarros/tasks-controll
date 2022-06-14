import { DateTime } from "ts-luxon";
import { TTaskStatus } from "./Dto/TaskDto";

export default interface Task {
  id?: string;
  userId?: string;
  title: string;
  description: string;
  expiresAt: DateTime | Date;
  status?: TTaskStatus;
  createdAt: DateTime | Date;
  finishedAt?: DateTime | Date;
}
