import TaskRepository from "../repository/TaskRepository";
import AddTask from "../usecases/task/AddTask/AddTask";
import FinishTask from "../usecases/task/FinishTask/FinishTask";
import GetOneTask from "../usecases/task/GetOneTask/GetOneTask";
import GetTasksList from "../usecases/task/GetTasksList/GetTasksList";
import TaskFactoryUseCase from "../usecases/task/TaskFactoryUseCase";
import { CreateTaskRequest } from "./TaskControllerDTO";

export default class TaskController {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly addTask: AddTask,
    private readonly finishTask: FinishTask,
    private readonly getOneTask: GetOneTask,
    private readonly getTasksList: GetTasksList,
    private readonly taskFactory: TaskFactoryUseCase
  ) {}

  async createTask({ auth, body }: CreateTaskRequest) {
    const { title, description, expiresAt } = body;
    const { userId } = auth;
    const task = await this.addTask.execute({
      title,
      description,
      expiresAt,
      userId: "any_user_id",
    });

    return task;
  }
}
