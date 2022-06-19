import { DataSource, Repository } from "typeorm";
import { GetTasksListQueryParams } from "../../../core/entities/Task/Dto/TaskDto";
import Task from "../../../core/entities/Task/Task";
import TaskRepository from "../../../core/repository/TaskRepository";
import { AddTaskDTO } from "../../../core/usecases/task/AddTask/AddTaskDTO";
import { AppDataSource } from "../../database/data-source";
import TaskModel from "../../database/entity/Task";
import { DateTime } from "ts-luxon";
import TaskAdapter from "../../../core/adpters/Task/TaskAdapter";

export default class TaskRepositoryPostgres implements TaskRepository {
  addTask(date: AddTaskDTO): Promise<Task> {
    throw new Error("Method not implemented.");
  }
  async getTasksList(query?: GetTasksListQueryParams): Promise<Task[]> {
    const tasks = await AppDataSource.manager.find(TaskModel);
    return tasks.reduce((acc, cur) => {
      return [
        ...acc,
        {
          ...cur,
          expiresAt: DateTime.fromISO(cur.expiresAt.toJSON()),
        },
      ];
    }, []);
  }
  async getTaskById(taskId: string): Promise<Task> {
    const task = await AppDataSource.manager.findOneBy(TaskModel, {
      id: taskId,
    });
    return TaskAdapter.create({
      title: task.title,
      description: task.description,
      expiresAt: DateTime.fromISO(task.expiresAt.toJSON()),
      id: task.id,
      isFinished: task.isFinished,
      createdAt: DateTime.fromISO(task.createdAt.toJSON()),
      userId: task.userId,
    });
  }
  finishTask(taskId: string): Promise<Task> {
    throw new Error("Method not implemented.");
  }
}