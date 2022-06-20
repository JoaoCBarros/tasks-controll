import TaskRepository from "../../../repository/TaskRepository";

export default class FinishTask {
  constructor(private readonly taskRepository: TaskRepository) {}
  async execute(taskId: string, userId: string) {
    const task = await this.taskRepository.getTaskById(taskId);
    if (userId !== task.userId) {
      throw new Error("NOT_AUTHORIZADE");
    }
    return await this.taskRepository.finishTask(taskId);
  }
}
