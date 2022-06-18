import { GetTasksListQueryParams } from "../../../core/entities/Task/Dto/TaskDto";
import Task from "../../../core/entities/Task/Task";
import TaskRepository from "../../../core/repository/TaskRepository";
import { AddTaskDTO } from "../../../core/usecases/task/AddTask/AddTaskDTO";
import { v4 as uuidv4 } from "uuid";
import { DateTime } from "ts-luxon";

export default class TaskRepositoryMemory implements TaskRepository {
  tasks: Task[] = [];

  async finishTask(taskId: string): Promise<Task> {
    this.tasks = this.tasks.reduce((acc, cur) => {
      if (taskId === cur.id) {
        return [
          ...acc,
          {
            ...cur,
            isFinished: true,
          },
        ];
      }
    }, []);

    return this.tasks.filter((item) => {
      return item.id === taskId;
    })[0];
  }
  async getTasksList(query?: GetTasksListQueryParams): Promise<Task[]> {
    if (query.orderField === "expiresAt") {
      this.tasks.sort(function (a, b) {
        return (
          (a.expiresAt as DateTime).toMillis() -
          (b.expiresAt as DateTime).toMillis()
        );
      });
    }
    return this.tasks;
  }
  async addTask({
    title,
    description,
    expiresAt,
    userId,
    id,
    createdAt,
    isFinished,
    isOverdue,
  }: AddTaskDTO): Promise<Task> {
    this.tasks.push({
      id,
      title,
      description,
      expiresAt,
      userId,
      createdAt,
      isFinished,
      isOverdue,
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
