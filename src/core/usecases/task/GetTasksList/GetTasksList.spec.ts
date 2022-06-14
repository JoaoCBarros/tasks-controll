import { DateTime } from "ts-luxon";
import TaskRepositoryMemory from "../../../../infra/repositories/TaskRepositoryMemory";
import AddTaskUseCase from "../AddTask/AddTaskUseCase";
import TaskFactoryUseCase from "../TaskFactoryUseCase";
import GetTasksList from "./GetTasksList";

describe("GetTasksList", () => {
  it("Should have 3 tasks in List", async () => {
    const taskRepositoryMemory = new TaskRepositoryMemory();
    const taskFactory = new TaskFactoryUseCase();
    const addTaskUseCase = new AddTaskUseCase(taskRepositoryMemory);
    const getTasksList = new GetTasksList(taskRepositoryMemory, taskFactory);

    await addTaskUseCase.execute({
      title: "My First Task",
      description: "Learn the Bank Manual",
      expiresAt: DateTime.fromISO("2022-06-17T00:00:00"),
      userId: "any_user_id",
    });
    await addTaskUseCase.execute({
      title: "My First Task",
      description: "Learn the Bank Manual",
      expiresAt: DateTime.fromISO("2022-06-17T00:00:00"),
      userId: "any_user_id",
    });
    await addTaskUseCase.execute({
      title: "My First Task",
      description: "Learn the Bank Manual",
      expiresAt: DateTime.fromISO("2022-06-17T00:00:00"),
      userId: "any_user_id",
    });

    const tasksList = await getTasksList.execute();
    expect(tasksList.length).toBe(3);
  });

  it("Should have 2 overdue tasks and 1 valid task in List", async () => {
    const taskRepositoryMemory = new TaskRepositoryMemory();
    const taskFactory = new TaskFactoryUseCase();
    const addTaskUseCase = new AddTaskUseCase(taskRepositoryMemory);
    const getTasksList = new GetTasksList(taskRepositoryMemory, taskFactory);

    await addTaskUseCase.execute({
      title: "My First Task",
      description: "Learn the Bank Manual",
      expiresAt: DateTime.fromISO("2022-01-01T00:00:00"),
      userId: "any_user_id",
    });
    await addTaskUseCase.execute({
      title: "My First Task",
      description: "Learn the Bank Manual",
      expiresAt: DateTime.fromISO("2022-01-01T00:00:00"),
      userId: "any_user_id",
    });
    await addTaskUseCase.execute({
      title: "My First Task",
      description: "Learn the Bank Manual",
      expiresAt: DateTime.fromISO("2022-06-17T00:00:00"),
      userId: "any_user_id",
    });

    const tasksList = await getTasksList.execute();
    expect(tasksList[0].isOverdue).toBe(true);
    expect(tasksList[1].isOverdue).toBe(true);
    expect(tasksList[2].isOverdue).toBe(false);
  });
});
