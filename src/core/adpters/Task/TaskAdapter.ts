import { DateTime } from "ts-luxon";
import Task from "../../entities/Task/Task";
interface ITaskAdapter {
  title: string;
  description: string;
  expiresAt: DateTime;
  isFinished: boolean;
  id: string;
  userId: string;
  createdAt: DateTime;
}
export default class TaskAdapter {
  static create({
    title,
    description,
    expiresAt,
    isFinished,
    id,
    userId,
    createdAt,
  }: ITaskAdapter): Task {
    return {
      title,
      description,
      expiresAt,
      isFinished,
      id,
      userId,
      createdAt,
    };
  }
}
