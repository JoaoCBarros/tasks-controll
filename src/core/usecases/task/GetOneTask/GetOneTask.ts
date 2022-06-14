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
    const dateNow = DateTime.now();
    const dateDiffInDays = Math.round(
      (task.expiresAt as DateTime).diff(dateNow, ["days"]).days
    );
    task.status = this.taskFactory.calculeStatus(dateDiffInDays);
    return task;
  }
}
