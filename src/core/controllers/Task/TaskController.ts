import TaskRepository from "../../repository/TaskRepository";
import AddTask from "../../usecases/task/AddTask/AddTask";
import FinishTask from "../../usecases/task/FinishTask/FinishTask";
import GetOneTask from "../../usecases/task/GetOneTask/GetOneTask";
import GetTasksList from "../../usecases/task/GetTasksList/GetTasksList";
import TaskFactoryUseCase from "../../usecases/task/TaskFactoryUseCase";
import {
  CreateTaskRequest,
  FinishTaskRequest,
  TasksListRequest,
} from "./TaskControllerDTO";

export default class TaskController {
  constructor(
    private readonly taskRepository: TaskRepository,
    private readonly addTask: AddTask,
    private readonly finishTaskUseCase: FinishTask,
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
      userId,
    });

    return task;
  }

  async tasksList({ auth, queryStrings }: TasksListRequest) {
    const { order = "desc", orderField = "expiresAt", search } = queryStrings;
    const { userId } = auth;
    const tasks = await this.getTasksList.execute({
      order,
      orderField,
      userId,
      search,
    });

    return tasks;
  }

  async finishTask({ params }: FinishTaskRequest) {
    const { taskId } = params;

    const task = await this.finishTaskUseCase.execute(taskId);

    return task;
  }
}
