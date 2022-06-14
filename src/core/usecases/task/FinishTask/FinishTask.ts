import TaskRepository from "../../../repository/TaskRepository";

export default class FinishTask {
  constructor(private readonly taskRepository: TaskRepository) {}
  async execute(taskId: string) {
    return await this.taskRepository.finishTask(taskId);
  }
}
