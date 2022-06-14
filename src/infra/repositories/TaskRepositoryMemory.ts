import { GetTasksListQueryParams } from "../../core/entities/Task/Dto/TaskDto";
import Task from "../../core/entities/Task/Task";
import TaskRepository from "../../core/repository/TaskRepository";
import { AddTaskDTO } from "../../core/usecases/task/AddTask/AddTaskDTO";
import { v4 as uuidv4 } from "uuid";

export default class TaskRepositoryMemory implements TaskRepository {
  tasks: Task[] = [];
  async getTasksList(query?: GetTasksListQueryParams): Promise<Task[]> {
    return this.tasks;
  }
  async addTask({
    title,
    description,
    expiresAt,
    userId,
    id,
    createdAt,
  }: AddTaskDTO): Promise<Task> {
    this.tasks.push({
      id,
      title,
      description,
      expiresAt,
      userId,
      createdAt,
    });

    return this.tasks.filter((item) => {
      return item.id === id;
    })[0];
  }

  async getTaskById(taskId: string): Promise<Task> {
    return this.tasks.filter((item) => {
      return item.id === taskId;
    })[0];
  }
}
