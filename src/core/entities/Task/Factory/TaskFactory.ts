import { DateTime } from "ts-luxon";
import { TTaskStatus } from "../Dto/TaskDto";
import Task from "../Task";

export default interface TaskFactory {
  calculateStatusToTaskList(unCalculatedStatusTasksList: Task[]): Task[];
  calculeStatus(expiresAt: DateTime): TTaskStatus;
  verifyOverdue(expiresAt: DateTime): boolean;
}
