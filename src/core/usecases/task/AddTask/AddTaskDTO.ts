import { DateTime } from "ts-luxon";

export interface AddTaskDTO {
  id: string;
  title: string;
  description: string;
  expiresAt: DateTime;
  createdAt: DateTime;
  userId: string;
  isFinished: boolean;
  isOverdue: boolean;
}

export interface AddTaskRequestDTO {
  title: string;
  description: string;
  expiresAt: DateTime;
  userId: string;
}
