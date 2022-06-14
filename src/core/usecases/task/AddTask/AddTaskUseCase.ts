import TaskRepository from "../../../repository/TaskRepository";
import { AddTaskRequestDTO } from "./AddTaskDTO";
import { v4 as uuidv4 } from "uuid";
import { DateTime } from "ts-luxon";

export default class AddTaskUseCase {
  constructor(private readonly taskRepository: TaskRepository) {}

  async execute({ title, description, expiresAt, userId }: AddTaskRequestDTO) {
    const uuid = uuidv4();
    const createdAt = DateTime.now();
    return await this.taskRepository.addTask({
      id: uuid,
      title,
      description,
      expiresAt,
      userId,
      createdAt,
    });
  }
}
