import { GetTasksListQueryParams } from "../../../core/entities/Task/Dto/TaskDto";
import Task from "../../../core/entities/Task/Task";
import TaskRepository from "../../../core/repository/TaskRepository";
import { AddTaskDTO } from "../../../core/usecases/task/AddTask/AddTaskDTO";

export default class TaskRepositoryPostgres implements TaskRepository {
  addTask(date: AddTaskDTO): Promise<Task> {
    throw new Error("Method not implemented.");
  }
  getTasksList(query?: GetTasksListQueryParams): Promise<Task[]> {
    throw new Error("Method not implemented.");
  }
  getTaskById(taskId: string): Promise<Task> {
    throw new Error("Method not implemented.");
  }
  finishTask(taskId: string): Promise<Task> {
    throw new Error("Method not implemented.");
  }
}
