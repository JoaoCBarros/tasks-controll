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
  async addTask(data: AddTaskDTO): Promise<Task> {
    const task = new TaskModel();
    task.title = data.title;
    task.description = data.description;
    task.id = data.id;
    task.userId = data.userId;
    task.expiresAt = data.expiresAt;
    task.isFinished = false;

    await AppDataSource.manager.save(task);

    return TaskAdapter.create({
      title: task.title,
      description: task.description,
      expiresAt: task.expiresAt,
      id: task.id,
      isFinished: task.isFinished,
      createdAt: task.createdAt,
      userId: task.userId,
    });
  }
  async getTasksList(query?: GetTasksListQueryParams): Promise<Task[]> {
    const tasks = await AppDataSource.manager.find(TaskModel, {
      where: {
        userId: query.userId,
      },
      order: {
        [query.orderField]: query.order,
      },
    });
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
