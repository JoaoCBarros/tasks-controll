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
    const unFormattedTasksList: Task[] = await this.taskRepository.getTasksList(
      {
        ...data,
        order: "asc",
        orderField: "expiresAt",
      }
    );

    const tasksList = this.taskFactory.formatTasksList(unFormattedTasksList);

    return tasksList;
  }
}
