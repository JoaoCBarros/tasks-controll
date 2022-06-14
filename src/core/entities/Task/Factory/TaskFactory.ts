import { TTaskStatus } from "../Dto/TaskDto";
import Task from "../Task";

export default interface TaskFactory {
  calculateStatusToTaskList(unCalculatedStatusTasksList: Task[]): Task[];
  calculeStatus(dateDiffInDays: number): TTaskStatus;
}
