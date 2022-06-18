import TaskRepositoryPostgres from "../../../infra/repositories/postgres/TaskRepositoryPostgres";
import TaskController from "../../controllers/Task/TaskController";
import AddTask from "../../usecases/task/AddTask/AddTask";
import FinishTask from "../../usecases/task/FinishTask/FinishTask";
import GetOneTask from "../../usecases/task/GetOneTask/GetOneTask";
import GetTasksList from "../../usecases/task/GetTasksList/GetTasksList";
import TaskFactoryUseCase from "../../usecases/task/TaskFactoryUseCase";

export const makeTaskController = (): TaskController => {
  const taskRepository = new TaskRepositoryPostgres();
  const addTask = new AddTask(taskRepository);
  const finishTaskUseCase = new FinishTask(taskRepository);
  const taskFactory = new TaskFactoryUseCase();
  const getOneTask = new GetOneTask(taskRepository, taskFactory);
  const getTasksList = new GetTasksList(taskRepository, taskFactory);

  return new TaskController(
    addTask,
    finishTaskUseCase,
    getOneTask,
    getTasksList
  );
};
