import { GetTasksListQueryParams } from "../entities/Task/Dto/TaskDto";
import Task from "../entities/Task/Task";
import { AddTaskDTO } from "../usecases/task/AddTask/AddTaskDTO";
import { TasksListReponseDTO } from "../usecases/task/GetTasksList/GetTasksListDTO";

export default interface TaskRepository {
  addTask(date: AddTaskDTO): Promise<Task>;
  getTasksList(query?: GetTasksListQueryParams): Promise<Task[]>;
  getTaskById(taskId: string): Promise<Task>;
}
