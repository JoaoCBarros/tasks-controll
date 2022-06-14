import TaskRepository from "../../../repository/TaskRepository";
import { GetTasksListDTO } from "./GetTasksListDTO";
import Task from "../../../entities/Task/Task";
import TaskFactory from "../../../entities/Task/Factory/TaskFactory";

export default class GetTasksList {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly taskFactory: TaskFactory
  ) {}

  async execute(data?: GetTasksListDTO) {
    const unCalculatedStatusTasksList: Task[] =
      await this.taskRepository.getTasksList(data);

    const tasksList = this.taskFactory.calculateStatusToTaskList(
      unCalculatedStatusTasksList
    );
    return tasksList;
  }
}
