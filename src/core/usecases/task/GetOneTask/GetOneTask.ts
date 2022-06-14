import { DateTime } from "ts-luxon";
import TaskFactory from "../../../entities/Task/Factory/TaskFactory";
import TaskRepository from "../../../repository/TaskRepository";

export default class GetOneTask {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly taskFactory: TaskFactory
  ) {}

  async execute(taskId: string) {
    const task = await this.taskRepository.getTaskById(taskId);

    task.status = this.taskFactory.calculeStatus(task.expiresAt as DateTime);

    // task.isOverdue = this.taskFactory.verifyOverdue(task.expiresAt as DateTime);
    return task;
  }
}
